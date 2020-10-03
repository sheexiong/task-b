<template>
  <div>
    <b-jumbotron
      header="CS3219 Assignment B"
      lead="Welcome to CS3219 OTOT Assignment Task B"
    >
      <p>This website is build by Bootstrap Vue.</p>
      <hr class="my-4" />
      <p>
        You can access GET, POST, PUT and DELETE request through this website to
        interact with backend.
      </p>
    </b-jumbotron>

    <b-card title="GET REQUEST" sub-title="Get quote(s) from backend">
      <b-card-body>
        <b-container fluid>
          <h4>Get All Quotes</h4>
          <b-button v-on:click="getAll" variant="primary">
            Get All Quotes
          </b-button>
          <b-button v-on:click="clearAll" variant="danger"> Reset </b-button>
          <b-list-group style="margin-top: 15px">
            <b-list-group-item v-for="quote in quotes" :key="quote.id">
              <h5>Quote: {{ quote.content }}</h5>
              <h6>Author: {{ quote.author }}</h6>
              <p>Id: {{ quote.id }}</p>
            </b-list-group-item>
            <b-list-group-item v-if="msg1 != ''" style="margin-top: 15px">
              <h5>{{ msg1 }}</h5>
            </b-list-group-item>
          </b-list-group>
        </b-container>

        <hr class="my-4" />

        <b-container fluid>
          <h4>Get single quote</h4>
          <b-form>
            <b-form-group id="getGroup" label-for="get-1">
              <b-form-input
                id="get-1"
                v-model="formid"
                placeholder="Enter quote's id"
              ></b-form-input>
            </b-form-group>
            <b-button v-on:click="getSingle" variant="primary">
              Get The Quote
            </b-button>
            <b-button v-on:click="clearSingle" variant="danger">
              Reset
            </b-button>
          </b-form>
          <b-list-group-item v-if="content != ''" style="margin-top: 15px">
            <h5>Quote: {{ content }}</h5>
            <h6>Author: {{ author }}</h6>
            <p>Id: {{ id }}</p>
          </b-list-group-item>
          <b-list-group-item v-if="msg2 != ''" style="margin-top: 15px">
            <h5>{{ msg2 }}</h5>
          </b-list-group-item>
        </b-container>
      </b-card-body>
    </b-card>

    <b-card title="POST REQUEST" sub-title="Upload new quote to backend">
      <b-card-body>
        <b-container fluid>
          <h4>Add new quote</h4>
          <b-form>
            <b-form-group id="post-group-1" label-for="post-1">
              <b-form-input
                id="post-1"
                v-model="newcontent"
                required
                placeholder="Enter new quote"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="post-group-2" label-for="post-2">
              <b-form-input
                id="post-2"
                v-model="newauthor"
                required
                placeholder="Enter the author"
              ></b-form-input>
            </b-form-group>
            <b-button v-on:click="addNew" variant="primary"> Submit </b-button>
            <b-button v-on:click="clearAdd" variant="danger"> Reset </b-button>
            <h4 style="color: red" v-if="msg3 != ''">
              {{ msg3 }}
            </h4>
          </b-form>
        </b-container>
      </b-card-body>
    </b-card>

    <b-card title="PUT REQUEST" sub-title="Update existing quote">
      <b-card-body>
        <b-container fluid>
          <h4>Update quote</h4>
          <b-form>
            <b-form-group id="put-group-1" label-for="put-1">
              <b-form-input
                id="put-1"
                v-model="updateid"
                required
                placeholder="Enter id"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="put-group-2" label-for="put-2">
              <b-form-input
                id="put-2"
                v-model="updatecontent"
                required
                placeholder="Enter updated quote"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="put-group-3" label-for="put-3">
              <b-form-input
                id="put-3"
                v-model="updateauthor"
                required
                placeholder="Enter updated author"
              ></b-form-input>
            </b-form-group>
            <b-button v-on:click="update" variant="primary"> Update </b-button>
            <b-button v-on:click="clearUpdate" variant="danger">
              Reset
            </b-button>
            <h4 style="color: red" v-if="msg4 != ''">{{ msg4 }}</h4>
          </b-form>
        </b-container>
      </b-card-body>
    </b-card>

    <b-card title="DELETE REQUEST" sub-title="Delete the quote">
      <b-card-body>
        <b-container fluid>
          <h4>Delete a quote</h4>
          <b-form>
            <b-form-group id="del-group-1" label-for="del-1">
              <b-form-input
                id="del-1"
                v-model="delid"
                required
                placeholder="Enter quote's id"
              ></b-form-input>
            </b-form-group>
            <b-button v-on:click="deleteSingle" variant="primary">
              Delete
            </b-button>
            <b-button v-on:click="clearDelSingle" variant="danger">
              Reset
            </b-button>
            <h4 style="color: red" v-if="msg5 != ''">
              {{ msg5 }}
            </h4>
          </b-form>
        </b-container>

        <hr class="my-4" />

        <b-container fluid>
          <h4>Delete all quote</h4>
          <b-button v-on:click="deleteAll" variant="danger">
            Delete All Quotes
          </b-button>
          <h4 style="color: red" v-if="msg6 != ''">
            {{ msg6 }}
          </h4>
        </b-container>
      </b-card-body>
    </b-card>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      quotes: [],
      id: "",
      content: "",
      author: "",
      msg1: "",
      msg2: "",
      msg3: "",
      msg4: "",
      msg5: "",
      msg6: "",
      err: "",
      formid: "",
      newcontent: "",
      newauthor: "",
      updateid: "",
      updatecontent: "",
      updateauthor: "",
      delid: "",
    };
  },
  methods: {
    getAll() {
      axios
        .get(
          "https://pm8df80mo7.execute-api.ap-southeast-1.amazonaws.com/dev/api/quote"
        )
        .then((res) => {
          if (res.data == []) {
            this.msg1 = "No quotes in the backend";
          } else {
            this.quotes = res.data;
          }
        })
        .catch((err) => {
          this.err = err.message;
        });
    },
    clearAll() {
      this.quotes = [];
      this.msg1 = "";
    },
    getSingle() {
      axios
        .get(
          "https://pm8df80mo7.execute-api.ap-southeast-1.amazonaws.com/dev/api/quote/".concat(
            this.formid
          )
        )
        .then((res) => {
          this.content = "";
          this.author = "";
          this.id = "";
          this.msg2 = "";

          if (res.data != []) {
            this.content = res.data.content;
            this.author = res.data.author;
            this.id = res.data.id;
            this.formid = "";
          } else {
            this.msg2 = "This quote not found!";
          }
        })
        .catch((err) => {
          this.err = err.message;
        });
    },
    clearSingle() {
      this.content = "";
      this.author = "";
      this.id = "";
      this.msg2 = "";
      this.formid = "";
    },
    addNew() {
      const data = {
        content: this.newcontent,
        author: this.newauthor,
      };
      axios
        .post(
          "https://pm8df80mo7.execute-api.ap-southeast-1.amazonaws.com/dev/api/quote/",
          data
        )
        .then((res) => {
          if (res.data.id != "") {
            this.msg3 = "Add Successfully";
            this.newcontent = "";
            this.newauthor = "";
          }
        })
        .catch((err) => {
          this.err = err.message;
        });
    },
    clearAdd() {
      this.msg3 = "";
      this.newcontent = "";
      this.newauthor = "";
    },
    update() {
      if (this.updateid == "") {
        this.msg4 = "Please Enter the Id";
      } else {
        const data = {
          content: this.updatecontent,
          author: this.updateauthor,
        };
        axios
          .put(
            "https://pm8df80mo7.execute-api.ap-southeast-1.amazonaws.com/dev/api/quote/".concat(
              this.updateid
            ),
            data
          )
          .then((res) => {
            console.log(res.data);
            if (res.data.status == "success") {
              this.updateid = "";
              this.updatecontent = "";
              this.updateauthor = "";
              this.msg4 = "Update Successfully";
            } else {
              this.msg4 = "Update Failed";
            }
          })
          .catch((err) => {
            this.err = err.message;
          });
      }
    },
    clearUpdate() {
      this.updateid = "";
      this.updatecontent = "";
      this.updateauthor = "";
      this.msg4 = "";
    },
    deleteSingle() {
      if (this.delid == "") {
        this.msg5 = "Please Enter the Id";
      } else {
        axios
          .delete(
            "https://pm8df80mo7.execute-api.ap-southeast-1.amazonaws.com/dev/api/quote/".concat(
              this.delid
            )
          )
          .then((res) => {
            if (res.data.status == "success") {
              this.delid = "";
              this.msg5 = "Delete Successfully";
            } else {
              this.msg5 = "Delete Failed";
            }
          })
          .catch((err) => {
            this.err = err.message;
          });
      }
    },
    clearDelSingle() {
      this.delid = "";
      this.msg5 = "";
    },
    deleteAll() {
      axios
        .delete(
          "https://pm8df80mo7.execute-api.ap-southeast-1.amazonaws.com/dev/api/quote/"
        )
        .then((res) => {
          if (res.data.id != "") {
            this.msg6 = "Delete successfully";
          }
        })
        .catch((err) => {
          this.err = err.message;
        });
    },
  },
};
</script>