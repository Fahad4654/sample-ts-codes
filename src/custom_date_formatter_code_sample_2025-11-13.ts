type DateFormatOptions = {
  year: 'numeric' | '2-digit';
  month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day: 'numeric' | '2-digit';
  weekday?: 'long' | 'short' | 'narrow';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
};

function formatDate(date: Date, format: DateFormatOptions): string {
  const options: Intl.DateTimeFormatOptions = {
    year: format.year,
    month: format.month,
    day: format.day,
    weekday: format.weekday,
    hour: format.hour,
    minute: format.minute,
    second: format.second,
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Example Usage:
const myDate = new Date();
const formattedDate1 = formatDate(myDate, { year: 'numeric', month: 'long', day: 'numeric' });
const formattedDate2 = formatDate(myDate, { year: '2-digit', month: 'short', day: '2-digit', weekday: 'short' });

console.log(formattedDate1);
console.log(formattedDate2);