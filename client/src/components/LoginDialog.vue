<template>
	<v-dialog v-model="loginDialog" persistent max-width="350px">
		<v-card>
			<v-card-title class="primary-title">
				<v-layout justify-center>
					<span class="headline">Login</span>
				</v-layout>
			</v-card-title>
      <v-alert class="mx-3"
       :value="alert.visible" 
       :color="alert.color" 
       transition="scale-transition">
        {{alert.message}}
      </v-alert>
      <v-form v-model="valid" ref="loginForm" lazy-validation>
        <v-card-text class="pt-0">
          <v-container class="pt-0" grid-list-md>
            <v-layout wrap>
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
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="login">Login</v-btn>
        </v-card-actions>
      </v-form>
		</v-card>
	</v-dialog>
</template>

<script>
import { eventBus } from "../eventBus";
export default {
  data() {
    return {
      loginDialog: false,
      valid: false, //Form Validity
      e1: true, //Password Visibility
      alert: {
        visible: false,
        color: "error",
        message: ""
      }, //Alert
      userData: {
        email: "",
        password: ""
      },
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
    login() {
      if (this.$refs.loginForm.validate()) {
        this.loginDialog = false;
        eventBus.$emit("userLoggedIn", true);
      }
    },

    close() {
      this.$refs.loginForm.reset();
      this.loginDialog = false;
      this.alert.visible = false;
      this.e1 = true;
    }
  },

  created() {
    var vm = this;
    eventBus.$on("loginDialog", value => {
      vm.loginDialog = value;
    });
  }
};
</script>
