const mapParentData = (data)=>{
  const updatedLocations = data.map((location)=>{
    let loc = {}
    loc.location_id = location.location_id
    loc.location_type = location.location_type
    loc.name = location.name
    loc.name_id = location.name_id

    if(location.parent_id){
      loc.parents = []
      if(location.parent_1){
        loc.parents.push({
          location_id:location.parent_1_location_id,
          location_type:location.parent_1_location_type,
          name:location.parent_1,
          name_id:location.parent_1_name_id,
          parent_id:location.parent_1_parent_id
        })
      }
      if(location.parent_2){
        loc.parents.push({
          location_id:location.parent_2_location_id,
          location_type:location.parent_2_location_type,
          name:location.parent_2,
          name_id:location.parent_2_name_id,
          parent_id:location.parent_2_parent_id
        })
      }
      if(location.parent_3){
        loc.parents.push({
          location_id:location.parent_3_location_id,
          location_type:location.parent_3_location_type,
          name:location.parent_3,
          name_id:location.parent_3_name_id
        })
      }
    }
    return loc
  })

  return updatedLocations
}

module.exports = mapParentData;
