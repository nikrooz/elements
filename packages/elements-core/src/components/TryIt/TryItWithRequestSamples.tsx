import { Box, InvertTheme, VStack } from '@stoplight/mosaic';
import { Request as HarRequest } from 'har-format';
import * as React from 'react';

import { extractCodeSamples, RequestSamples } from '../RequestSamples';
import { ResponseExamples, ResponseExamplesProps } from '../ResponseExamples/ResponseExamples';
import { TryIt, TryItProps } from './TryIt';

export type TryItWithRequestSamplesProps = Omit<TryItProps, 'onRequestChange'> &
  ResponseExamplesProps & { hideTryIt?: boolean; hideTryItPanel?: boolean; hideSamples?: boolean };

export const TryItWithRequestSamples: React.FC<TryItWithRequestSamplesProps> = ({
  hideTryIt,
  hideTryItPanel,
  hideSamples,
  ...props
}) => {
  const [requestData, setRequestData] = React.useState<HarRequest | undefined>();

  const customCodeSamples = extractCodeSamples(props.httpOperation);

  return (
    <VStack spacing={6}>
      {!hideTryIt ? (
        <InvertTheme>
          <Box>
            <TryIt {...props} hideTryItPanel={hideTryItPanel} onRequestChange={setRequestData} />
          </Box>
        </InvertTheme>
      ) : (
        // The TryIt is responsible for generating the Request Data so it should always be rendered
        <>
          <TryIt {...props} hideTryItPanel={hideTryIt} onRequestChange={setRequestData} />
        </>
      )}

      {requestData && !hideSamples && <RequestSamples request={requestData} customCodeSamples={customCodeSamples} />}

      <ResponseExamples {...props} />
    </VStack>
  );
};
