import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useHooks } from '../../hooks';

const dataPoint = {
  date: '',
  weight: 205,
  expectedWeight: 215
};

const dates = new Array(20)
  .fill(dataPoint)
  .map((data, i) => ({
    ...data,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString().slice(0, -5)
  }));

const Example = (props) => {
  const hooks = useHooks()
  const weightData = hooks.weight?.data
    ?.filter((item) => item.user_id === hooks.user_id);

  // console.log("In Line Charts: ", weightData)
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={weightData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} horizontal strokeDasharray={"1"} />
          <XAxis dataKey="date" />
          <YAxis dataKey="weight" />
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Line type="linear" dataKey="weight" stroke="#82ca9d" dot={false}  />
        </LineChart>
      </ResponsiveContainer>
    );
  };

export default Example  