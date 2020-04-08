import * as React from "react";
import { IBoard } from "../../types";
import Input from "./input";

const SearchSelect: React.FC<IProps> = ({ onSelect, label, name, index, error }) => {
  const [asset, setAsset] = React.useState<IBoard>(null);
  const [assets, setAssets] = React.useState<IBoard[]>([]);
  const [value, setValue] = React.useState<string>("");
  return (
    <div className={"relative w-full"}>
      <Input
        name={name}
        label={label}
        value={value}
        error={error}
        success={!!asset}
        autoComplete="off"
        placeholder={"Search for a board"}
        onBlur={() => {
          setTimeout(() => setAssets([]), 200);
        }}
        onChange={(e) => {
          const val = e.target.value;
          setValue(val);
          setAsset(null);
          onSelect(null);
          (async () => {
            const response = await fetch(`/api/${index}/_search?`, {
              body: JSON.stringify(
                {
                  query: {
                    wildcard: {
                      name: {
                        value: `*${val}*`,
                      }
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
            if (json.hits.hits) {
              setAssets(json.hits.hits);
            }
          })();
        }}
      />
      <div className={"max-h-8 shadow-lg rounded bg-white overflow-y-auto absolute w-full mt-1"}>
        {assets.map((item) => (
          <button
            className={"p-1 rounded hover:bg-gray-200 w-full text-left"}
            key={item._id}
            onClick={() => {
              setAsset(item);
              setAssets([]);
              setValue(item._source.name);
              onSelect(item);
            }}
            type={"button"}
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
  onSelect?: (asset: IBoard) => void;
  error?: string;
}

export default SearchSelect;
