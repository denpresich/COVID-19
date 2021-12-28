import React from 'react';
import PropTypes from 'prop-types';
import styled, { useTheme } from 'styled-components';
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import ChartTooltip from './Tooltip';
import DateLabel from './DateLabel';
import CountLabel from './CountLabel';
import Dot from './Dot';

const Container = styled.div`
  margin-right: 8px;
`;

function Chart({ data }) {
  const theme = useTheme();

  const [focusedLine, setFocusedLine] = React.useState();

  const handleLegendMouseEnter = React.useCallback(
    (item) => setFocusedLine(item.dataKey),
    [setFocusedLine]
  );

  const handleLegendMouseLeave = React.useCallback(
    () => setFocusedLine(null),
    [setFocusedLine]
  );

  return (
    <Container>
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" height={60} tick={DateLabel} />
          <YAxis type="number" tick={CountLabel} tickCount={10} />
          <Tooltip content={<ChartTooltip />} />
          <CartesianGrid stroke="#87888a" strokeWidth={0.5} vertical={false} />
          <Legend
            wrapperStyle={{ position: 'relative' }}
            onMouseEnter={handleLegendMouseEnter}
            onMouseLeave={handleLegendMouseLeave}
          />
          <Line
            name="Confirmed"
            key="confirmed"
            type="monotone"
            dataKey="confirmed"
            stroke={
              !focusedLine || focusedLine === 'confirmed'
                ? theme.colors.warning
                : theme.colors.grey
            }
            dot={Dot}
            animationDuration={500}
          />
          <Line
            name="Recovered"
            key="recovered"
            type="monotone"
            dataKey="recovered"
            stroke={
              !focusedLine || focusedLine === 'recovered'
                ? theme.colors.success
                : theme.colors.grey
            }
            dot={Dot}
            animationDuration={500}
          />
          <Line
            name="Deaths"
            key="death"
            type="monotone"
            dataKey="death"
            stroke={
              !focusedLine || focusedLine === 'death'
                ? theme.colors.failure
                : theme.colors.grey
            }
            dot={Dot}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      confirmed: PropTypes.number.isRequired,
      recovered: PropTypes.number.isRequired,
      death: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default React.memo(Chart);
