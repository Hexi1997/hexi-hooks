## useTimeCountDown

### 简介

短时间内的倒计时 hook

### 示例:

```tsx
import React from 'react';
import hooks from 'hexi-hooks';
const { useTimeCountDown } = hooks;
const endDate = new Date('2022-12-16 11:00:00 GMT+0800').getTime();
export default () => {
  const { leftDays, leftHours, leftMinutes, leftSeconds, isOutOfDate } = useTimeCountDown(
    endDate,
    1000,
  );
  return (
    <div>
      <div>
        {leftDays} days {leftHours} hours {leftMinutes} mins {leftSeconds} secs left
      </div>
      <br />
      <div>is out of date: {String(isOutOfDate)}</div>
    </div>
  );
};
```
