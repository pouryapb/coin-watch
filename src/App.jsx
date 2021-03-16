import { Container } from "@material-ui/core";

import ChartComponent from "./components/ChartComponent";

function App() {
  return (
    <Container>
      <ChartComponent coin="dogecoin" currency="usd" />
    </Container>
  );
}

export default App;
