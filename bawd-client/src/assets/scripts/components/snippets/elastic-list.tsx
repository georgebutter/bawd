import * as React from "react";

const ElasticList: React.FC<IProps> = ({
  renderLoading,
  renderNoResults,
  renderError,
  render,
  index,
}) => {
  const [status, setStatus] = React.useState<string>("loading");
  const [data, setData] = React.useState<any>(null);
  React.useEffect(() => {
    (async () => {
      const response = await fetch(`/api/${index}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (json.status === "error") {
        setData(json.error);
        setStatus("error");
      } else {
        setData(json.result);
        setStatus("ready");
      }
    })();
  }, []);
  if (status === "loading") {
    return renderLoading();
  } else if (status === "ready") {
    if (data.body.hits.hits.length) {
      return render(data.body.hits.hits);
    }
    return renderNoResults();
  }
  return renderError(data);

};

interface IProps {
  index: string;
  render: (data: any) => JSX.Element;
  renderLoading: () => JSX.Element;
  renderError: (error: any) => JSX.Element;
  renderNoResults: () => JSX.Element;
}

export default ElasticList;
