import { ConfigProvider } from "antd";
import Routers from "./routers/Routers";

const App = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: { colorTextHeading: "#1570EF" },
          components: {},
        }}
      >
        <Routers />
      </ConfigProvider>
    </>
  );
};

export default App;
