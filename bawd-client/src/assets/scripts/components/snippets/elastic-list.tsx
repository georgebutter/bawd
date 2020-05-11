import * as React from "react";

const ElasticList: React.FC<IProps> = ({
  renderLoading,
  renderNoResults,
  renderError,
  render,
  index,
  query,
}) => {
  const [status, setStatus] = React.useState<string>("loading");
  const [data, setData] = React.useState<any>(null);
  React.useEffect(() => {
    (async () => {
      const response = await fetch(`/api/${index}${query ? `/search` : ``}`, {
        body: JSON.stringify(query),
        headers: {
          "Content-Type": "application/json",
        },
        method: query ? "POST" : "GET",
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
  }, [query, index]);

  if (status === "loading") {
    return renderLoading ? renderLoading() : <React.Fragment />;
  } else if (status === "ready") {
    if (data?.body?.hits?.hits?.length > 0) {
      return render(data.body.hits.hits);
    }
    return renderNoResults ? renderNoResults() : <React.Fragment />;
  }
  return renderError(data);

};

interface IProps {
  index: string;
  render: (data: any) => JSX.Element;
  renderLoading?: () => JSX.Element;
  renderError: (error: any) => JSX.Element;
  renderNoResults?: () => JSX.Element;
  query?: any;
}

export default ElasticList;
