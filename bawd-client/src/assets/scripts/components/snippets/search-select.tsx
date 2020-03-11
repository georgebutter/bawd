import * as React from "react";
import { IBoard } from "../../types";
import Input from "./input";

declare const BONSAI_URL: string;

const SearchSelect: React.FC<IProps> = ({ onSelect, label, name, index }) => {
  const [asset, setAsset] = React.useState<IBoard>(null);
  const [assets, setAssets] = React.useState<Array<{ _source: IBoard }>>([]);
  return (
    <div className={"relative"}>
      <Input name={name} label={label} onChange={(e) => {
        const { value } = e.target;
        (async () => {
          const response = await fetch(`${BONSAI_URL}/${index}/_search?`, {
            body: JSON.stringify(
              {
                query: {
                  bool: {
                    filter: [
                      {
                        bool: {
                          should: [
                            {
                              query_string: {
                                fields: [
                                  "name"
                                ],
                                query: `* ${value}`
                              }
                            }
                          ],
                        }
                      },
                    ],
                  }
                },
              }
            ),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          });
          const json = await response.json();
          console.log(json);
          if (json.hits.hits) {
            setAssets(json.hits.hits);
          }
        })();
      }}/>
      <div className={"max-h-2 bg-white overflow-y-auto absolute w-full mt-1"}>
        {assets.map((item) => (
          <button
            className={"p-1 rounded hover:bg-gray-200 w-full text-left"}
            key={item._source.name}
            onClick={() => setAsset(item._source)}
          >
            {item._source.name}
          </button>
        ))}
      </div>
    </div>
  );
};

interface IProps {
  label: string;
  name: string;
  index: string;
  onSelect?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default SearchSelect;
