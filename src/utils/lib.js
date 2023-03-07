function jsonapiToNormItem(data) {
  if (!data) {
    return {};
  }
  const norm = { _jv: data, ...data.attributes };
  const { attributes, ...normNoAttrs } = norm._jv;
  norm._jv = normNoAttrs;
  return norm;
}

function getRelationships(data, included) {
  const relationships = data._jv.relationships || {};

  const relationshipsData = {};
  for (const relName of Object.keys(relationships)) {
    const relItem = relationships[relName].data || {};
    if (relItem instanceof Array) {
      relationshipsData[relName] = relItem.map((item) => {
        const obj = included.find(
          (el) => el.type === item.type && el.id === item.id
        );
        return pushObject(obj || {}, included);
      });
    } else {
      const obj = included.find(
        (el) => el.type === relItem.type && el.id === relItem.id
      );
      relationshipsData[relName] = pushObject(obj || {}, included);
    }
  }
  return relationshipsData;
}

function followRelationships(record, included) {
  const data = {};
  Object.defineProperties(data, Object.getOwnPropertyDescriptors(record));
  const relationships = getRelationships(data, included);
  Object.defineProperties(
    data,
    Object.getOwnPropertyDescriptors(relationships)
  );
  return data;
}

function pushObject(data, included) {
  let item = jsonapiToNormItem(data);
  item = followRelationships(item, included);
  return item;
}

export function pushPayload(payload) {
  let included = [];
  if (payload.included) included = payload.included;

  let result =
    payload.data instanceof Array
      ? payload.data.map((item) => pushObject(item, included))
      : pushObject(payload.data, included);

  return result;
}
