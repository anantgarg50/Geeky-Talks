<template>
  <v-dialog v-model="registerDialog" persistent max-width="350px">
		<v-card>
			<v-card-title class="primary-title">
				<v-layout justify-center>
					<span class="headline">Register</span>
				</v-layout>
			</v-card-title>
      <v-alert class="mx-3"
       :value="alert.visible" 
       :color="alert.color" 
       transition="scale-transition">
        {{alert.message}}
      </v-alert>
      <v-form v-model="valid" ref="registerForm" lazy-validation>
        <v-card-text class="pt-0">
          <v-container class="pt-0" grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Name" v-model="userData.name"
                  :rules="[rules.required]"
                  requied></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" v-model="userData.email"
                  :rules="[rules.required, rules.email]"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" 
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  v-model="userData.password" 
                  :rules="[rules.required, rules.password]"
                  required></v-text-field>
              </v-flex> 
              <v-flex xs12>
                <v-text-field label="Confirm Password"
                  :append-icon="e2 ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (e2 = !e2)"
                  :type="e2 ? 'password' : 'text'"
                  :rules="[rules.required, matchPasswords]"
                  v-model="userData.confirmPassword"
                  required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close
          ">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="registerUser">Register</v-btn>
        </v-card-actions>
      </v-form>
		</v-card>
	</v-dialog>
</template>

<script>
import { eventBus } from "../eventBus";
import RegisterService from "@/services/RegisterService";
export default {
  data: () => {
    return {
      valid: false, //Form Validity
      e1: true, //Password Visibility
      e2: true, //Confirm password Visibility
      alert: {
        visible: false,
        color: "error",
        message: ""
      }, //Alert
      userData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      registerDialog: false,
      rules: {
        required: value => !!value || "This field is required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Enter a valid E-mail.";
        },
        password: value =>
          (value && value.length >= 8) || "Minimum 8 characters required."
      }
    };
  },

  methods: {
    matchPasswords: function(value) {
      return value == this.userData.password ? true : "Passwords do not match!";
    },

    async registerUser() {
      if (this.$refs.registerForm.validate()) {
        const response = await RegisterService.register({
          name: this.userData.name,
          email: this.userData.email,
          password: this.userData.password
        })
          .then(
            function(response) {
              this.alert.message = response.data.message;
              this.alert.color = "success";
              this.alert.visible = true;
              this.e1 = true;
              this.e2 = true;

              this.$refs.registerForm.reset();

              setTimeout(() => {
                this.registerDialog = false;
                this.alert.visible = false;
              }, 3000);
            }.bind(this)
          )
          .catch(
            function(error) {
              this.alert.message = error.response.data.error;
              this.alert.color = "error";
              this.alert.visible = true;
            }.bind(this)
          );
      }
    },

    close: function() {
      this.$refs.registerForm.reset();
      this.registerDialog = false;
      this.alert.visible = false;
      this.e1 = true;
      this.e2 = true;
    }
  },

  created() {
    var vm = this;
    eventBus.$on("registerDialog", value => {
      vm.registerDialog = value;
    });
  }
};
</script>

<style>

</style>
