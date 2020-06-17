
export const getField = ({ field, size = 500, name = "ids" }) => {
  return ({
    aggs: {
      [name]: {
        terms: {
          field,
          size,
        }
      }
    },
    size: 0
  });
};

export const notIds = ({ ids }) => {
  return ({
    query: {
      bool: {
        must_not: [
          {
            ids: {
              values: ids
            }
          }
        ]
      }
    }
  });
};

export const missingField = ({ field }) => {
  return ({
    query: {
      bool: {
        must_not: {
          exists: {
            field
          }
        }
      }
    }
  });
};
