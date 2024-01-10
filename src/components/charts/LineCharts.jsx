import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const dataPoint = {
  date: '',
  weight: 205,
  expectedWeight: 215
};

const dates = new Array(20)
  .fill(dataPoint)
  .map((data, i) => ({
    ...data,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString()
  }));

const Example = (props) => {
  // console.log(props?.data, dates)
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={dates.reverse()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="date" />
          <YAxis dataKey="weight" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 1 }} />
          <Line type="monotone" dataKey="expectedWeight" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

export default Example  