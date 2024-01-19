import Dashboard from "./Dashboard";
import LogFood from "./LogFood";
import NewsFeed from "./NewsFeed";
import Plans from "./Plans";
import Profile from "./Profile";
import ErrorBoundary from "./ErrorBoundary";


export const pages = [
  { name: "Dashboard", component: Dashboard },
  { name: "Log Food", component: LogFood },
  { name: "News Feed", component: NewsFeed },
  { name: "Plans", component: Plans },
  { name: "Profile", component: Profile },
];
export { Dashboard, LogFood, NewsFeed, Plans, Profile, ErrorBoundary };
