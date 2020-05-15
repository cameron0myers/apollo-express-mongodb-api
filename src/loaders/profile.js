export const batchProfile = async (keys, models) => {
    const profiles = await models.Profile.find({
      _id: {
        $in: keys,
      },
    });
  
    return keys.map((key) => profiles.find((profile) => profile.id == key));
  };
  