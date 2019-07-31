$( function() {
  target.global();
  target.set_validation(
    {
      "osm:name" : {
        "validation" : ["validate_present", "validate_capitalization"]
      },
      "osm:id": {
        "validation" : ["validate_present"],
        "filter" : ["filter_id"]
      },
      "osm:_user": {
        "validation" : ["validate_present"],
      },
      "osm:_timestamp": {
        "validation" : ["validate_present"],
      },

      "osm:wb_pb:id": {
        "validation": ["validate_present"],
        "group": "basic"
      },
      "osm:is_in:village" : {
        "validation": ["validate_present"],
        "group": "basic"
      },
      "osm:amenity" : {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["drinking_water","hospital","pharmacy","marketplace","school","bar","toilets","bank","clinic","fuel","community_centre","library","police","place_of_worship","restaurant","parking_space","post_office","bus_station","waste_disposal","car_wash","waste_basket","vending_machine","shelter"]},
        "group": "basic"
      },
      "osm:shop": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["chemist","variety_store","supermarket","hardware","department_store","car_repair","bakery","books","furniture","butcher","boutique"]},
        "group": "basic"
      },
      "osm:office": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["administrative","government"]},
        "group": "basic"
      },
      "osm:operational_status": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["operational","non_operational"]},
        "group": "facilities"
      },

      "osm:education:gender_type": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["boys","girls","mixed"], "if_key": "osm:amenity", "if_value": ["school"]},
        "group": "school"
      },
      "osm:education:government_registered": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["moe","mgcsd"], "if_key": "osm:amenity", "if_value": ["school"]},
        "group": "school"
      },
      "osm:operator:type": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["cbo","government","ngo","ngo_international","private","religious"], "if_key": "osm:amenity", "if_value": ["school"]},
        "group": "school"
      },
      "osm:operator:description": {
        "validation": ["validate_none"],
        "group": "school"
      },
      "osm:education:type": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["pre_primary","primary","secondary","vocational"], "if_key": "osm:amenity", "if_value": ["school"]},
        "group": "school"
      },
      "osm:fee": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["yes", "no"], "if_key": "osm:amenity", "if_value": ["school"]},
        "group": "school"
      },

      "osm:health_facility:referals": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["yes", "no"], "if_key": "osm:amenity", "if_value": ["hospital", "clinic"]},
        "group": "health"
      },
      "osm:medical_service:family_planning": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["yes", "no"], "if_key": "osm:amenity", "if_value": ["hospital", "clinic"]},
        "group": "health"
      },
      "osm:medical_service:general_medical_services": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["yes", "no"], "if_key": "osm:amenity", "if_value": ["hospital", "clinic"]},
        "group": "health"
      },
      "osm:medical_service:immunizations": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["yes", "no"], "if_key": "osm:amenity", "if_value": ["hospital", "clinic"]},
        "group": "health"
      },
      "osm:medical_service:malaria": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["yes", "no"], "if_key": "osm:amenity", "if_value": ["hospital", "clinic"]},
        "group": "health"
      },
      "osm:medical_service:pregnancy_test": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["yes", "no"], "if_key": "osm:amenity", "if_value": ["hospital", "clinic"]},
        "group": "health"
      },

      "osm:toilets:disposal": {
         "validation": ["validate_allowed_list_or_null"],
         "options" : {"allowed_list": ["flush","pit_latrine"]},
         "group": "facilities"
       },
       "osm:toilets:handwashing": {
          "validation": ["validate_allowed_list_or_null"],
          "options" : {"allowed_list": ["yes","no"]},
          "group": "facilities"
        },
      "osm:electricity": {
        "validation": ["validate_allowed_list_or_null"],
        "options": {"allowed_list": ["always","sometimes","often","never"]},
        "group": "facilities"
      },
      "osm:barrier": {
        "validation": ["validate_allowed_list_or_null"],
        "options": {"allowed_list": ["fence","guard_rail","wall"]},
        "group": "facilities"
      },
      "osm:fence_type": {
        "validation": ["validate_allowed_list_or_null"],
        "options": {"allowed_list": ["barbed_wire","electric","chain_link","metal","pole","wire"]},
        "group": "facilities"
      },

      "_unallowed": {
        "validation" : ["validate_unallowed"],
        "filter": ["filter_unallowed"],
        "group" : "basic"
      }
    }
  );
  target.load_geojson("/target/data/baringo-projects.geojson");
});
