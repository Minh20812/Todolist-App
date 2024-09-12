import { ConfigProvider } from "antd";
import Routers from "./routers/Routers";

const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {},
          components: {},
        }}
      >
        <Routers />
      </ConfigProvider>
    </>
  );
};

export default App;
