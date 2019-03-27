import * as React from 'react';
import { Shimmer, ShimmerElementType } from 'office-ui-fabric-react/lib/Shimmer';

class Shimmers extends React.Component<{},{}>{
    public render(): JSX.Element{
        return(
            <div>
            <p></p>
            <Shimmer
            shimmerElements={[
              { type: ShimmerElementType.circle, height: 24 },
              { type: ShimmerElementType.gap, width: '2%' },
              { type: ShimmerElementType.line, height: 16, width: '20%' },
              { type: ShimmerElementType.gap, width: '5%' },
              { type: ShimmerElementType.line, height: 16, width: '20%' },
              { type: ShimmerElementType.gap, width: '10%' },
              { type: ShimmerElementType.line, height: 16, width: '15%' },
              { type: ShimmerElementType.gap, width: '10%' },
              { type: ShimmerElementType.line, height: 16 }
            ]}
          />
          <Shimmer
            shimmerElements={[
              { type: ShimmerElementType.circle, height: 24 },
              { type: ShimmerElementType.gap, width: '2%' },
              { type: ShimmerElementType.line, height: 16, width: '20%' },
              { type: ShimmerElementType.gap, width: '5%' },
              { type: ShimmerElementType.line, height: 16, width: '20%' },
              { type: ShimmerElementType.gap, width: '10%' },
              { type: ShimmerElementType.line, height: 16, width: '15%' },
              { type: ShimmerElementType.gap, width: '10%' },
              { type: ShimmerElementType.line, height: 16 }
            ]}
          />
          <Shimmer
            shimmerElements={[
              { type: ShimmerElementType.circle, height: 24 },
              { type: ShimmerElementType.gap, width: '2%' },
              { type: ShimmerElementType.line, height: 16, width: '20%' },
              { type: ShimmerElementType.gap, width: '5%' },
              { type: ShimmerElementType.line, height: 16, width: '20%' },
              { type: ShimmerElementType.gap, width: '10%' },
              { type: ShimmerElementType.line, height: 16, width: '15%' },
              { type: ShimmerElementType.gap, width: '10%' },
              { type: ShimmerElementType.line, height: 16 }
            ]}
          />
          <Shimmer
            shimmerElements={[
              { type: ShimmerElementType.circle, height: 24 },
              { type: ShimmerElementType.gap, width: '2%' },
              { type: ShimmerElementType.line, height: 16, width: '20%' },
              { type: ShimmerElementType.gap, width: '5%' },
              { type: ShimmerElementType.line, height: 16, width: '20%' },
              { type: ShimmerElementType.gap, width: '10%' },
              { type: ShimmerElementType.line, height: 16, width: '15%' },
              { type: ShimmerElementType.gap, width: '10%' },
              { type: ShimmerElementType.line, height: 16 }
            ]}
          />
            </div>
        );
    }
}

export default Shimmers;