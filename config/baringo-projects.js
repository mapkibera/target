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
      "osm:image": {
        "validation": ["validate_url"],
        "group": "basic"
      },
      "osm:image:project": {
        "validation": ["validate_url"],
        "group": "basic"
      },
      "osm:amenity" : {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["school","toilets","place_of_worship","bar","restaurant","community_centre","bus_station","bank","fuel","library","police","post_office","waste_disposal","car_wash","waste_basket","parking_space","cinema","shelter","marketplace","townhall","courthouse","mobile_money_agent","drinking_water","hospital","pharmacy","clinic"]},
        "group": ["basic","school","water","health"]
      },

      //other_feature
      "osm:waste": {
        "validation": ["validate_allowed_list_if"],
        "options": {
          "allowed_list": ["trash"],
          "if_key": "osm:amenity", "if_value": ["waste_disposal"],
        },
        "group": ["other_feature"]
      },
      "osm:shelter_type":{
        "validation": ["validate_allowed_list_if"],
        "options": {
          "allowed_list": ["boda"],
          "if_key": "osm:amenity", "if_value": ["shelter"],
        },
        "group": ["other_feature"]
      },
      "osm:craft":{
        "validation": ["validate_allowed_list_or_null"],
        "options": {
          "allowed_list": ["yes"]
        },
        "group": "other_feature"
      },
      "osm:leisure":{
        "validation": ["validate_allowed_list_or_null"],
        "options": {
          "allowed_list": ["stadium","pitch","playground"]
        },
        "group": "other_feature"
      },
      "osm:office": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["administrative","government"]},
        "group": "other_feature"
      },
      "osm:tourism": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["guest_house","attraction"]},
        "group": "other_feature"
      },
      "osm:highway": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["street_lamp"]},
        "group": "other_feature"
      },
      "osm:man_made": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["communications_tower","storage_tank","water_well","water_tower","wastewater_plant","works","livestock_dip"]},
        "group": ["other_feature","water","agriculture"]
      },
      "osm:building": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["office","warehouse","greenhouse"]},
        "group": ["other_feature","agriculture"]
      },
      "osm:power": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["transformer"]},
        "group": "other_feature"
      },
      "osm:barrier": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["fence","guard_rail","wall"]},
        "group": "other_feature"
      },
      "osm:fence_type": {
        "validation": ["validate_allowed_list_if"],
        "options" : {
          "allowed_list": ["barbed_wire","electric","chain_link","metal","pole","wire"],
          "if_key": "osm:barrier", "if_value": ["fence"],
        },
        "group": "other_feature"
      },
      "osm:industrial": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["slaughterhouse"]},
        "group": "other_feature"
      },

      //School
      "osm:education:type": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["pre_primary","primary","secondary","vocational","driving_school","tertiary"], "if_key": "osm:amenity", "if_value": ["school"]},
        "group": "school"
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
        "options" : {"allowed_list": ["cbo","government","ngo","ngo_international","private","religious","other"], "if_key": "osm:amenity", "if_value": ["school","drinking_water"]},
        "group": ["school","water"]
      },
      "osm:operator:description": {
        "validation": ["validate_present_if"],
        "options" : {
          "if_key": "osm:amenity", "if_value": ["school","toilets"]
        },
        "group": ["school", "toilets"]
      },
      "osm:fee": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["yes", "no"], "if_key": "osm:amenity", "if_value": ["school","toilets"]},
        "group": ["school","toilets","water"]
      },

      //toilets

      "osm:toilets:disposal": {
         "validation": ["validate_allowed_list_if"],
         "options" : {
          "allowed_list": ["flush","pit_latrine"],
          "if_key": "osm:amenity", "if_value": ["toilets"]
         },
         "group": "toilets"
      },
      "osm:toilets:handwashing": {
          "validation": ["validate_allowed_list_if"],
          "options" : {
            "allowed_list": ["yes","no"],
            "if_key": "osm:amenity", "if_value": ["toilets"]
          },
          "group": "toilets"
      },
      "osm:charge": {
          "validation": ["validate_none"],
          "group": "toilets"
      },
      "osm:toilets:num_chambers": {
           "validation": ["validate_numeric_if"],
           "options" : {
             "if_key": "osm:amenity", "if_value": ["toilets"]
           },
           "group": "toilets"
      },
      "osm:opening_hours": {
         "validation": ["validate_present_if"],
         "options" : {
           "if_key": "osm:amenity", "if_value": ["toilets"]
         },
         "group": "toilets"
       },


      //shops
      "osm:shop": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["chemist","variety_store","supermarket","hardware","department_store","car_repair","bakery","books","furniture","butcher","boutique","kiosk","electronics","hairdresser","cafe","ticket"]},
        "group": "shop"
      },
      "osm:male": {
        "validation": ["validate_allowed_list_if"],
        "options" : {
          "allowed_list": ["yes","no",""],
          "if_key": "osm:shop", "if_value": ["hairdresser"]
        },
        "group": "shop"
      },

      //religious
      "osm:religion": {
        "validation": ["validate_allowed_list_if"],
        "options" : {
          "allowed_list": ["christian","islam"],
          "if_key": "osm:amenity", "if_value": ["place_of_worship"]
        },
        "group": "religious"
      },
      "osm:denomination": {
        "validation": ["validate_allowed_list_if"],
        "options" : {
          "allowed_list": ["anglican","catholic","evangelical","baptist","pentecostal","presbyterian","lutheran","sunni","shia","methodist","seventh_day_adventist"],
          "if_key": "osm:amenity", "if_value": ["place_of_worship"]
        },
        "group": "religious"
      },
      "osm:service_times": {
        "validation": ["validate_present_if"],
        "options" : {
          "if_key": "osm:amenity", "if_value": ["place_of_worship"]
        },
        "group": "religious"
      },

      //water
      "osm:tunnel": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["culvert"]},
        "group": "water"
      },
      "osm:description": {
        "validation": ["validate_allowed_list_if"],
        "options" : {
          "allowed_list": ["water_tank","water_tap","kiosk"],
          "if_key": "osm:amenity", "if_value": ["drinking_water"]
        },
        "group": "water"
      },
      "osm:water_way": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["drain","dam"]},
        "group": "water"
      },
      "osm:dam:type": {
        "validation": ["validate_allowed_list_if"],
        "options" : {
          "allowed_list": ["earth_dam","sand_dam"],
          "if_key": "osm:water_way", "if_value": ["dam"]
        },
        "group": "water"
      },
      "osm:natural": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["spring"]},
        "group": "water"
      },
      "osm:operational_status": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["operational","non_operational"]},
        "group": ["water","agriculture"]
      },
      "osm:operator:funding": {
        "validation": ["validate_allowed_list_or_null"],
        "options" : {"allowed_list": ["cdf","cbo","national_government","ngo","other"]},
        "group": "water"
      },

      "osm:health_facility:type": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["dispensary","health_centre",""], "if_key": "osm:amenity", "if_value": ["clinic"]},
        "group": "health"
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
      "osm:dispensing": {
        "validation": ["validate_allowed_list_if"],
        "options" : {"allowed_list": ["yes", "no"], "if_key": "osm:amenity", "if_value": ["hospital","clinic"]},
        "group": "health"
      },
      "osm:electricity": {
        "validation": ["validate_allowed_list_if"],
        "options": {"allowed_list": ["always","sometimes","often","never"], "if_key": "osm:amenity", "if_value": ["hospital","clinic"]},
        "group": "health"
      },

      "osm:product": {
        "validation": ["validate_allowed_list_if"],
        "options": {"allowed_list": ["dairy","fruit"], "if_key": "osm:man_made", "if_value": ["works"]},
        "group": "agriculture"
      },
     "osm:landuse": {
       "validation": ["validate_allowed_list_or_null"],
       "options": {"allowed_list": ["orchard","farmyard"]},
       "group": "agriculture"
     },

      "_unallowed": {
        "validation" : ["validate_unallowed"],
        "filter": ["filter_unallowed"],
        "group" : "basic"
      }
    }
  );
});
