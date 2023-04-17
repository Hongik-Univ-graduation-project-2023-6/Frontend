import { css } from '@emotion/react';
import * as d3 from 'd3';
import { useCallback, useEffect, useRef } from 'react';
import { ANIMATION_DURATION, BAR_GAP, BAR_HEIGHT } from '@/constants/chart';
import { colors } from '@/styles/colors';
import { IDiagnosisResponse } from '@/types/api';

interface Props {
  data: IDiagnosisResponse[];
}

const ResultChart = ({ data }: Props) => {
  const chartRef = useRef<SVGSVGElement>(null);

  const margin = {
    top: 16,
    right: 16,
    left: 16,
    bottom: 16,
  };

  const drawChart = useCallback(() => {
    const width = chartRef.current?.parentElement?.offsetWidth || 300;
    const height = data.length * (BAR_HEIGHT + BAR_GAP) - BAR_GAP;
    const domain = data.map((item) => item.name);

    const chartSvg = d3
      .select(chartRef.current)
      .attr('width', width)
      .attr('height', height + margin.top + margin.bottom);

    const yScale = d3
      .scaleBand()
      .range([margin.top, height + margin.bottom])
      .domain(domain)
      .paddingOuter(0)
      .paddingInner(0.3);

    chartSvg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', 0 + margin.left)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .attr('y', (item) => yScale(item.name)!)
      .attr('width', 0)
      .attr('height', yScale.bandwidth())
      .attr('fill', `${colors.greenbox3}`)
      .attr('stroke', `${colors.graytext2}`)
      .attr('ry', 5)
      .transition()
      .duration(ANIMATION_DURATION)
      .attr(
        'width',
        (item) =>
          ((width - margin.left - margin.right) * item.percentage) / 100,
      );

    chartSvg
      .selectAll('text')
      .data(data)
      .join('text')
      .text((item) => `${item.name} 0%`)
      .attr('x', width - margin.right)
      .attr('dx', '-2%')
      .attr('text-anchor', 'end')
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .attr('y', (item) => yScale(item.name)! + yScale.bandwidth() / 2)
      .attr('dy', '1%')
      .transition()
      .duration(ANIMATION_DURATION)
      .tween('text', function (item: IDiagnosisResponse) {
        const interpolate = d3.interpolate(0, item.percentage);
        return (time) => {
          d3.select(this).text(`${item.name} ${interpolate(time).toFixed(1)}%`);
        };
      });
  }, [data, margin.top, margin.bottom, margin.left, margin.right]);

  useEffect(() => {
    drawChart();
  }, [data, drawChart]);

  return (
    <div css={wrapper}>
      <svg ref={chartRef} />
    </div>
  );
};

const wrapper = css`
  width: 100%;
  font-size: 16px;
`;

export default ResultChart;
