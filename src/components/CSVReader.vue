<template>
  <div>
    <p>Csv Reader:</p>
        <div class="form">
            Select Training Data:
                <div class="form-group csv-import-file">
                    <input ref="csv" type="file" @change.prevent="validFileMimeType" :class="inputClass" name="csv">
                    <slot name="error" v-if="showErrorMessage && !isValidFileMimeType">
                        File type is invalid
                    </slot>
                </div>
             <p></p>
        <button @click="decisionTreeConversions" class="blue">Calculate Conversions</button>
        <p></p>
                    <tbody>
                        <tr v-for="(field, key) in fieldsToMap" :key="key">
                            <td>Field Label, Mabel: {{ field.label }}</td>
                            <td>
                                <select class="form-control" v-model="map[field.key]">
                                    <option v-for="(column, key) in firstRow" :key="key" :value="key">{{ column }}</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                    <p></p>
                    <hr />
           <vue-csv-import v-model="csv" ></vue-csv-import> 
        </div>
  </div><!-- end root -->
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
import Papa from 'papaparse';
import DecisionTree from "decision-tree";

import makeaDecision from '@/helpers/makeaDecision';

export default {
  name: 'CSVReader',
  props: {
    msg: String,
    value: Array,
    url: {
      type: String
    },
    mapFields: {
      required: true
    },
    callback: {
      type: Function,
      default: () => {
        alert("Call Back, anyTime!!")
      }
    },
    catch: {
      type: Function,
      default: () => {
      }
    },
    finally: {
      type: Function,
      default: () => {
        }
      },
    parseConfig: {
      type: Object,
      default() {
        return {};
          }
      },
            headers: {
                default: null
            },
            loadBtnText: {
                type: String,
                default: "Next"
            },
            submitBtnText: {
                type: String,
                default: "Submit"
            },
            tableClass: {
                type: String,
                default: "table"
            },
            checkboxClass: {
                type: String,
                default: "form-check-input"
            },
            buttonClass: {
                type: String,
                default: "btn btn-primary"
            },
            inputClass: {
                type: String,
                default: "form-control-file"
            },
            fileMimeTypes: {
                type: Array,
                default: () => {
                    return ["text/csv"];
                }
            }
  },//end props
  data: () => ({
    form: {
      csv: null,
    },
    fieldsToMap: [],
    map: {},
    hasHeaders: true,
    csv: null,
    sample: null,
    isValidFileMimeType: false,
    fileSelected: false
   }),
    created() {
      console.log("CSVReader - created: ", this.mapFields )
            this.hasHeaders = this.headers;

            if (_.isArray(this.mapFields)) {
                this.fieldsToMap = _.map(this.mapFields, (item) => {
                    return {
                        key: item,
                        label: item
                    };
                });
            } else {
                this.fieldsToMap = _.map(this.mapFields, (label, key) => {
                    return {
                        key: key,
                        label: label
                    };
                });
            }
        },
        methods: {
            submit() {
              alert("Submit me, baby: "+ this.form.csv );
                const _this = this;
                this.form.csv = this.buildMappedCsv();
                this.$emit('input', this.form.csv);

                if (this.url) {
                    axios.post(this.url, this.form).then(response => {
                        _this.callback(response);
                    }).catch(response => {
                        _this.catch(response);
                    }).finally(response => {
                        _this.finally(response);
                    });
                } else {
                    _this.callback(this.form.csv);
                }
            },
             buildMappedCsv() {
               console.log("CSVReader - buildMappedCsv: ", this )
                const _this = this;

                let csv = this.hasHeaders ? _.drop(this.csv) : this.csv;
                console.log("CSVReader - buildMappedCsv csv: ", cvs )
                return _.map(csv, (row) => {
                    let newRow = {};

                    _.forEach(_this.map, (column, field) => {
                        _.set(newRow, field, _.get(row, column));
                    });

                    return newRow;
                });
            },
            validFileMimeType() {

                let file = this.$refs.csv.files[0];
                console.log("CSVReader - validFileMimeType: ", file  )

                if (file) {
                    this.isValidFileMimeType = (this.fileMimeTypes.indexOf(file.type) > -1);
                    this.fileSelected = true;
                } else {
                    this.isValidFileMimeType = false;
                    this.fileSelected = false;
                }
            },
            load() {
              console.log("CSVReader - load " )
                const _this = this;

                this.readFile((output) => {
                    _this.sample = _.get(Papa.parse(output, { preview: 2, skipEmptyLines: true }), "data");
                    _this.csv = _.get(Papa.parse(output, { skipEmptyLines: true }), "data");
                });
            },
          
            toggleHasHeaders() {
              console.log("CSVReader - toggleHasHeader " )
                this.hasHeaders = !this.hasHeaders;
            },
            readFile(callback) {
                //let file = "./csvsample.csv" ;//this.$refs.csv.files[0];

                let file = this.$refs.csv.files[0];

                console.log("CSVReader - readFile: ",  file )

                if (file !== undefined ) {
                    let reader = new FileReader();
                    reader.readAsText(file, "UTF-8");
                    reader.onload = function (evt) {
                        alert("CSVReader - readFile output: " + evt.target.result );
                        callback(evt.target.result);
                    };
                    reader.onerror = function () {
                      alert("Sorry can't load file!!")
                    };
                }
            },
        decisionTreeConversions() {

            const _this = this;

              console.log("CSVReader - decisionTreeConversions: ", _this )
                this.readFile((output) => {
                   // _this.sample = _.get(Papa.parse(output, { preview: 2, skipEmptyLines: true }), "data");
                    _this.csv = _.get(Papa.parse(output, { skipEmptyLines: true }), "data");

                    console.log("CSVReader - decisionTreeConversions - csv: ", _this.csv )
                  var conversion = {
                      ad_id: '708889', 
                      xyz_campaign_id: "916", 
                      fb_campaign_id: "103940", 
                      age: "30-40", 
                      gender:"M", 
                      interest: "15", 
                      impressions: "15615", 
                      Clicks: "3", 
                      Spent: "4.769999981", 
                      Total_Conversion: "1" 
                  }
                  
                  var conversion = { 
                  ad_id: '708818', 
                  xyz_campaign_id: "916", 
                  fb_campaign_id: "103928", 
                  age: "30-40", 
                  gender:"M", 
                  interest: "28", 
                  impressions: "4133", 
                  Clicks: "1", 
                  Spent: "1.289999962", 
                  Total_Conversion: "1" 
              }
              var conversions = makeaDecision.doYourThing(conversion, _this.csv );

            });
        },
        buildMappedCsv() {
          console.log("CSVReader - buildMappedCsv: ")
                const _this = this;

                let csv = this.hasHeaders ? _.drop(this.csv) : this.csv;

                return _.map(csv, (row) => {
                    let newRow = {};

                    _.forEach(_this.map, (column, field) => {
                        _.set(newRow, field, _.get(row, column));
                    });

                    return newRow;
                });
            },
        },//end methods
        watch: {
            map: {
                handler: function (newVal) {
                    if (!this.url) {
                        var hasAllKeys = this.mapFields.every(function (item) {
                            return newVal.hasOwnProperty(item);
                        });

                        if (hasAllKeys) {
                            this.submit();
                        }
                    }
                },
                deep: true
            }
        },
        computed: {
            firstRow() {
                return _.get(this, "sample.0");
            },
            showErrorMessage() {
                return this.fileSelected;
            },
            disabledNextButton() {
                return !this.isValidFileMimeType;
            }
        },
}//end default
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.blue {
  background: blue;
  color: white;
  padding: 0.5em;
  cursor: pointer;
}
</style>
