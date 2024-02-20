/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import React from 'react';
import { useTheme } from 'styled-components';
import { Range as RcRange, Handle as RcHandle } from 'rc-slider';
import Tooltip from 'rc-tooltip';

import { formatDate } from '../../utils/date';

function Handle({ value, ...props }) {
  const tooltip = formatDate(value, 'DD.MM.YYYY');

  return (
    <Tooltip overlay={tooltip} visible placement="top">
      <RcHandle
        {...props}
        value={value}
        style={{
          boxShadow: 'none',
          border: 'none',
          borderRadius: '50%',
          width: 14,
          backgroundColor: '#4285f4',
        }}
      />
    </Tooltip>
  );
}

function Range(props) {
  const theme = useTheme();

  return (
    <RcRange
      {...props}
      railStyle={{
        backgroundColor: theme.colors.grey,
        height: 3,
      }}
      trackStyle={[
        {
          backgroundColor: theme.colors.blue,
          height: 3,
        },
      ]}
      handle={(handleProps) => (
        <Handle key={`range-handle-${handleProps.value}`} {...handleProps} />
      )}
    />
  );
}

export default Range;
