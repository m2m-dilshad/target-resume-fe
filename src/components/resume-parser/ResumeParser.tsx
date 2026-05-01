/* eslint-disable @typescript-eslint/no-explicit-any */
import { LayoutDesign } from './LayoutDesigns';
import { ResumeProvider } from './ResumeContext';
import ThemeFontAndColor from './ThemeFontAndColor';
import ZoomProvider from './ZoomProvider';

export default function ResumeParser({ config, data }: { config: any; data: any }) {
  return (
    <ResumeProvider config={config} data={data}>
      <ZoomProvider>
        <ThemeFontAndColor>
          <LayoutDesign>{/* any extra things */}</LayoutDesign>
        </ThemeFontAndColor>
      </ZoomProvider>
    </ResumeProvider>
  );
}
