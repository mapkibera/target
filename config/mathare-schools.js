---
---
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
      "osm:accessibility" : {
        "validation" : ["validate_multi_allowed_list"],
        "options" : {"allowed_list" : ["big_vehicles","foot","small_cars"]},
        "group" : "infrastructure"
      },

      "osm:amenity" : {
        "validation" : ["validate_multi_allowed_list"],
        "options" : {"allowed_list" : ["college", "school", "university"]},
        "group" : "basic"
      },
      "osm:building:classrooms" : {
        "validation" : ["validate_numeric"],
        "group" : "infrastructure"
      },
      "osm:building:levels" : {
        "validation" : ["validate_numeric"],
        "group" : "infrastructure"
      },
      "osm:building:material" : {
        "validation" : ["validate_multi_allowed_list"],
        "options" : {"allowed_list" : ["cement_block","concrete","iron_sheet","wood"]},
        "group" : "infrastructure"
      },
      "osm:building:roof" : {
        "validation" : ["validate_multi_allowed_list"],
        "options" : {"allowed_list" : ["asbestos","concrete","iron_sheet"]},
        "group" : "infrastructure"
      },
      "osm:contact:address" : {
        "validation" : ["validate_present"],
        "group" : "infrastructure"
      },
      "osm:contact:email" : {
        "validation" : ["validate_present"],
        "group" : "infrastructure"
      },
      "osm:contact:phone" : {
        "validation" : ["validate_present"],
        "group" : "infrastructure"
      },
      "osm:education:boarding" : {
        "validation" : ["validate_yes_no"],
        "group" : "services"
      },
      "osm:education:bom_employed" : {
        "validation" : ["validate_yes_no"],
        "group" : "population"
      },
      "osm:education:bom_how_many" : {
        "validation" : ["validate_numeric"],
        "group" : "population"
      },
      "osm:education:curriculum" : {
        "validation": ["validate_multi_allowed_list"],
        "options" : {"allowed_list" : ["2_6_3_3_3","8_4_4","gcse","montessori","ntsa"]},
        "group" : "services"
      },
      "osm:education:exam_affiliate" : {
        "validation": [],
        "group" : "services"
      },
      "osm:education:exam_center" : {
        "validation": ["validate_yes_no"],
        "group" : "services"
      },
      "osm:education:extra_drama" : {
        "validation": ["validate_yes_no"],
        "group" : "services"
      },
      "osm:education:extra_music" : {
        "validation": ["validate_yes_no"],
        "group" : "services"
      },
      "osm:education:extra_other" : {
        "validation": [],
        "group" : "services"
      },
      "osm:education:extra_scouts" : {
        "validation": ["validate_yes_no"],
        "group" : "services"
      },
      "osm:education:extra_sports" : {
        "validation": ["validate_yes_no"],
        "group" : "services"
      },
      "osm:education:fees" : {
        "validation": ["validate_allowed_list"],
        "options" : {"allowed_list" : ["yes", "sponsored", "partially_sponsored", "free_education","other"]},
        "group" : "fees"
      },
      "osm:education:sponsored_by": {
        "validation" : [],
        "group": "fees"
      },
      "osm:education:fees_level1" : {
        "validation" : ["validate_numeric"],
        "group" : "fees"
      },
      "osm:education:fees_level2" : {
        "validation" : ["validate_numeric"],
        "group" : "fees"
      },
      "osm:education:fees_level3" : {
        "validation" : ["validate_numeric"],
        "group" : "fees"
      },
      "osm:education:fees_per_year" : {
        "validation" : ["validate_numeric"],
        "group" : "fees"
      },
      "osm:education:fees_admission" : {
        "validation" : ["validate_numeric"],
        "group" : "fees"
      },
      "osm:education:fees_exam" : {
        "validation" : ["validate_numeric"],
        "group" : "fees"
      },
      "osm:education:fees_lunch" : {
        "validation" : ["validate_numeric"],
        "group" : "fees"
      },
      "osm:education:fees_other" : {
        "validation" : [],
        "group" : "fees"
      },
      "osm:education:fees_trip" : {
        "validation" : ["validate_numeric"],
        "group" : "fees"
      },
      "osm:education:funding": {
        "validation" : ["validate_allowed_list"],
        "group" : "fees",
        "options" : {"allowed_list": ["parents","government","sponsors","other"]}
      },
      "osm:education:gender_type" : {
        "validation" : ["validate_allowed_list"],
        "options": {"allowed_list": ["boys","girls","mixed"]},
        "group": "basic"
      },
      "osm:education:government_grants" : {
        "validation": ["validate_yes_no"],
        "group": "basic"
      },
      "osm:education:government_registered" : {
        "validation": ["validate_allowed_list"],
        "options": {"allowed_list": ["APBET","mgcsd","moe","private","no","city_council","attorney_general"]},
        "group": "basic"
      },
      "osm:education:management_committee": {
        "validation": ["validate_yes_no"],
        "group": "basic"
      },
      "osm:education:mean_score": {
        "validation": ["validate_present"],
        "group": "basic"
      },
      "osm:education:nemis_code": {
        "validation": ["validate_yes_no"],
        "group": "basic"
      },
      "osm:education:ntsa_approved_teacher": {
        "validation": ["validate_yes_no"],
        "group": "population"
      },
      "osm:education:ntsa_how_many": {
        "validation": ["validate_numeric"],
        "group": "population"
      },
      "osm:education:operate_as": {
        "validation": ["validate_allowed_list"],
        "options": {"allowed_list": ["day_school","day_and_boarding","boarding_school"]},
        "group": "basic"
      },
      "osm:education:pta": {
        "validation": ["validate_yes_no"],
        "group":"basic"
      },
      "osm:education:program_counselling": {
        "validation": ["validate_yes_no"],
        "group": "services"
      },
      "osm:education:program_feeding": {
        "validation": ["validate_allowed_list"],
        "options": {"allowed_list": ["yes","no","central_feeding"]},
        "group": "services"
      },
      "osm:education:program_feeding_description": {
        "validation": [],
        "group": "services"
      },
      "osm:education:program_orphans": {
        "validation": ["validate_yes_no"],
        "group": "services"
      },
      "osm:education:program_other": {
        "validation": [],
        "group": "services"
      },
      "osm:education:program_sanitary_towel": {
        "validation": ["validate_yes_no"],
        "group": "services"
      },
      "osm:education:program_special_needs": {
        "validation": ["validate_yes_no"],
        "group": "services"
      },
      "osm:education:school_head": {
        "validation": ["validate_present"],
        "group": "basic"
      },
      "osm:education:students": {
        "validation": ["validate_numeric"],
        "group": "population"
      },
      "osm:education:students_female": {
        "validation": ["validate_numeric"],
        "group": "population"
      },
      "osm:education:students_male": {
        "validation": ["validate_numeric"],
        "group": "population"
      },
      "osm:education:teachers": {
        "validation": ["validate_numeric"],
        "group": "population"
      },
      "osm:education:teachers_female": {
        "validation": ["validate_numeric"],
        "group": "population"
      },
      "osm:education:teachers_male": {
        "validation": ["validate_numeric"],
        "group": "population"
      },
      "osm:education:teachers_trained": {
        "validation": ["validate_numeric"],
        "group": "population"
      },
      "osm:education:tsc_employed": {
        "validation": ["validate_yes_no"],
        "group": "population"
      },
      "osm:education:tsc_how_many": {
        "validation": ["validate_numeric"],
        "group": "population"
      },
      "osm:education:type": {
        "validation": ["validate_allowed_list"],
        "options": {"allowed_list": ["pre_primary","primary","secondary","vocational","library","other"]},
        "group": "basic"
      },
      "osm:education:type_of_vocational_school": {
        "validation": ["validate_allowed_list"],
        "options": {"allowed_list": ["driving_school","hair_dressing","other"]},
        "group": "basic"
      },
      "osm:education:registration_date": {
        "validation": ["validate_numeric"],
        "group": "basic"
      },
      "osm:electricity:operational_status": {
        "validation": ["validate_allowed_list"],
        "options": {"allowed_list": ["always","often","sometimes","never"]},
        "group": "infrastructure"
      },
      "osm:image:classroom": {
        "validation": ["validate_url"],
        "group": "basic"
      },
      "osm:image:compound": {
        "validation": ["validate_url"],
        "group": "basic"
      },
      "osm:image:outside": {
        "validation": ["validate_url"],
        "group": "basic"
      },
      "osm:image:sign_post": {
        "validation": ["validate_url"],
        "group": "basic"
      },
      "osm:operator:description": {
        "validation": ["validate_present"],
        "group": "basic"
      },
      "osm:operator:type": {
        "validation": ["validate_allowed_list"],
        "options": {"allowed_list": ["cbo","government","ngo","ngo_international","private","religious"]},
        "group": "basic"
      },
      "osm:toilet:arranged_name": {
        "validation": ["validate_present"],
        "group": "infrastructure"
      },
      "osm:toilets:male": {
        "validation": ["validate_numeric"],
        "group": "infrastructure"
      },
      "osm:toilets:female": {
        "validation": ["validate_numeric"],
        "group": "infrastructure"
      },
      "osm:toilet:present": {
        "validation": ["validate_allowed_list"],
        "options": {"allowed_list": ["yes","no","outside_public","arranged"]},
        "group": "infrastructure"
      },
      "osm:toilets:teachers_male": {
        "validation": ["validate_numeric"],
        "group": "infrastructure"
      },
      "osm:toilets:teachers_female": {
        "validation": ["validate_numeric"],
        "group": "infrastructure"
      },
      "osm:toilets:handwashing": {
        "validation": ["validate_yes_no"],
        "group": "infrastructure"
      },
      "osm:water:source": {
        "validation": ["validate_allowed_list"],
        "options": {"allowed_list": ["tap","water_tank"]},
        "group": "infrastructure"
      },
      "osm:location": {
        "validation": [],
        "group": "basic"
      },
      "_unallowed": {
        "validation" : ["validate_unallowed"],
        "filter": ["filter_unallowed"],
        "group" : "basic"
      }
    }
  );
});
