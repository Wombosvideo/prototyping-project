export const lookup = (field: string, collection = field) => ({
  '$lookup': {
    'from': collection, 
    'localField': field, 
    'foreignField': '_id', 
    'as': field
  }
}),
unwind = (field: string) => ({'$unwind': {'path': `$${field}`}}),
first = (field: string) => ({'$first': `$${field}`}),
addToSet = (field: string) => ({'$addToSet': `$${field}`});
