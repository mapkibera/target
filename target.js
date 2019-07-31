;(function(context) {
  var target = {
    global: function() {
      this.validate = {};
      this.results = {};
      this.groups = {};
    },

    validate_none: function(key, value, options) {
      return true;
    },
    validate_present: function(key, value, options) {
      return (typeof value !== "undefined");
    },
    validate_check: function(key, value, options) {
      return $.inArray(value, ["yes","no",undefined]) != -1;
    },
    validate_capitalization: function(key, value, options) {
      var test = true;
      if (value.indexOf("_") != -1) {
        test = false;
      }
      var words = value.split(" ");
      var lowers = ["and","of"];
      $.each( words , function( index, word ) {
        if (lowers.indexOf(word) == -1 && word.charAt(0) != word.charAt(0).toUpperCase()) {
          test = false;
        }
        if (word.indexOf(".") != -1 && word.indexOf(".") != (word.length - 1)) {
          test = false;
        }
      });

      return test;
    },
    validate_numeric: function(key, value, options) {
      if (typeof value !== "undefined") {
        return $.isNumeric(value);
      }
      return false;
    },
    validate_allowed_list: function(key, value, options) {
      return $.inArray(value,options["allowed_list"]) != -1;
    },
    validate_allowed_list_or_null: function(key,value, options) {
      return (typeof value == "undefined") || (this.validate_allowed_list(key,value,options));
    },
    validate_allowed_list_if: function(key, value, options, properties, validate_keys) {
      return ($.inArray(options["if_key"], Object.keys(properties)) == -1) || ($.inArray(properties[options["if_key"]], options["if_value"]) == -1) || this.validate_allowed_list(key,value,options);
    },
    validate_yes_no: function(key, value, options) {
      return $.inArray(value,["yes","no"]) != -1;
    },
    validate_yes_no_null: function(key, value, options) {
      return (typeof value == "undefined") || (this.validate_yes_no(key, value, options));
    },
    validate_multi_allowed_list: function(key, value, options) {
      var test = true;
      if (typeof value == "undefined") {
        return false;
      }
      var values = value.split(',');
      $.each( values, function( index, v) {
        if ($.inArray(v,options["allowed_list"]) == -1) {
          test = false;
        }
      });
      return test;
    },
    validate_date_after: function(key, value, options) {
      return value > options['date_after'];
    },
    validate_address: function(key, value, options) {
      return false;
    },
    validate_url: function(key, value, options) {
      var pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
      return pattern.test(value);
    },

    validate_unallowed: function(key, value, options, properties, validate_keys) {
      var unallowed = [];
      Object.keys(properties).forEach(function(prop) {
        if (! validate_keys.includes(prop)) {
          unallowed.push(prop);
        }
      });
      if (unallowed.length > 0) {
        return false;
      } else {
        return true;
      }
    },

    filter_unallowed: function(key, value, properties, validate_keys) {
      var unallowed = [];
      Object.keys(properties).forEach(function(prop) {
        if (! validate_keys.includes(prop)) {
          unallowed.push(prop);
        }
      });
      return unallowed.join(", ");
    },

    filter_date_year: function(key, value) {
      return value.substr(0,10);
    },
    filter_id: function(key, value) {
      return "<a href='http://www.openstreetmap.org/" + value + "'>" + value + "</a>";
    },

    toggle_group: function(e) {
      var group = e.target.innerHTML;
      $(e.target).toggleClass('pure-button-active');
      $.each( $($('#target-head').children()[0]).children() , function(index, th) {
        var tag = $(th).children()[0].innerHTML;
        if ($.inArray(tag, target.groups[ group ]) != -1) {
          if ($('td:nth-child(' + (index+1) + ')')[0].style.display == "none") {
            $('td:nth-child(' + (index+1) + '),th:nth-child(' + (index+1) + ')').show();
          } else {
            $('td:nth-child(' + (index+1) + '),th:nth-child(' + (index+1) + ')').hide();
          }
        }
      });
    },

    set_validation: function(setting) {
      this.validate = setting;
      var header = "<tr>";
      $.each( target.validate , function (key, params) {
        header += "<th><span>" + key + "</span></th>";
        target.results[ key ] = { "valid" : 0, "invalid" : 0 };
      });
      header += "</tr>";
      $( header ).appendTo("#target-head");

      var group_control = "<div>Filters: ";
      $.each( target.validate, function (key, params) {
        if (params['group'] !== undefined) {
          if (target.groups[ params['group']] === undefined) {
            target.groups[ params['group'] ] = [];
            group_control += "<span class='groupBtn pure-button pure-button-active'>" + params['group'] + "</span> ";
          }
          target.groups[ params['group'] ].push( key );
        }
      });
      group_control += "</div>";
      $( group_control ).appendTo('#controls');
      $(".groupBtn").click(target.toggle_group);
    },

    add_results: function() {
      var result_row = "<tr>";
      $.each( target.validate, function (key, params) {
        var total = target.results[ key ][ 'valid' ] + target.results[ key ][ 'invalid' ];
        result_row += "<th>" + (100 * target.results[ key ][ 'valid' ] / total).toPrecision(4) + "%</th>";
      });
      result_row += "</tr>";
     $( result_row ).appendTo("#target-head");
    },

    load_geojson: function(url) {
      $.getJSON( url, function( data ) {
        var items = [];
        $.each( data['features'], function( i, feature ) {
          var item = "<tr>";
          $.each( target.validate , function (key, params) {
            //Validations
            var result = true;
            $.each( params['validation'], function(j, validation_callback) {
              result = result && (target[ validation_callback ])( key, feature['properties'][key], params['options'], feature['properties'], Object.keys(target.validate) );
            });
            var result_class = (result ? "valid" : "invalid");

            //Filters
            var filtered_item = (feature['properties'][key] !== undefined ? feature['properties'][key] : "");
            if (params['filter'] !== undefined) {
              filtered_item = target[ params['filter'][0] ]( key, feature['properties'][key], feature['properties'], Object.keys(target.validate)  );
            }

            item += "<td class='" + result_class + "'>" + filtered_item + "</td>";
            target.results[ key ][result_class]++;
          });
          item += "</tr>";
          items.push(item);
        });
        $( items.join( "" ) ).appendTo( "#table-listing" );
        target.add_results();
        $('#target').tablesorter( { debug: true } );
        $("#target").tableHeadFixer({'left' : 1, 'head': true});
        $(".groupBtn").trigger('click');
      });
    }
  };
  window.target = target;

})(window);
