<template>
	<v-container>
		<v-flex my-5>
		<v-card>
			<v-card-title class="primary-title">
				<v-layout justify-center>
					<span class="headline">Contact Us</span>
				</v-layout>
			</v-card-title>
			<v-alert class="mx-3"
				:value="alert.visible" 
				:color="alert.color" 
				transition="scale-transition">
				{{alert.message}}
			</v-alert>
			<v-form v-model="valid" ref="contactForm" lazy-validation>
				<v-card-text class="pt-0">
					<v-container class="pt-0" grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
								<v-text-field label="Name" required v-model="userContactDetails.name"
									:rules="[rules.required]"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="E-mail" required
                  v-model="userContactDetails.email"
									:rules="[rules.required, rules.email]"></v-text-field>
							</v-flex>
              <v-layout xs12 justify-center>
                <v-subheader>Address Details</v-subheader>
              </v-layout>
							<v-flex xs12>
								<v-text-field label="Flat/House No." v-model="userContactDetails.address.house"></v-text-field>
                  <v-text-field label="Address Line 1" v-model="userContactDetails.address.line1"></v-text-field>
                  <v-text-field label="Address Line 2" v-model="userContactDetails.address.line2"></v-text-field>
                  <v-text-field label="City" v-model="userContactDetails.address.city"></v-text-field>
                  <v-text-field label="Pincode" v-model="userContactDetails.address.pincode"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="Additional Comments"
                  textarea rows="5" v-model="userContactDetails.comments"></v-text-field>
							</v-flex>
						</v-layout>
					</v-container>
					<small>*indicates required field</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click.native="reset">Reset</v-btn>
					<v-btn color="blue darken-1" flat @click.native="contact">Submit</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-flex>
	</v-container>
</template>

<script>
export default {
  data: () => {
    return {
      valid: false, //Form Validity
      alert: {
        visible: false,
        color: "error",
        message: ""
      }, //Alert
      userContactDetails: {
        name: "",
        email: "",
        address: {
          house: "",
          line1: "",
          line2: "",
          city: "",
          pincode: ""
        },
        query: ""
      },
      rules: {
        required: value => !!value || "This field is required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Enter a valid E-mail.";
        }
      }
    };
  },
  methods: {
    contact() {
      if (this.$refs.contactForm.validate()) {
        this.alert.message = "We'll soon reach out to you via e-mail!";
        this.alert.color = "success";
        this.alert.visible = true;

        setTimeout(() => {
          this.alert.visible = false;
        }, 3000);

        this.$refs.contactForm.reset();
      }
    },

    reset: function() {
      this.$refs.contactForm.reset();
      this.alert.visible = false;
    }
  }
};
</script>
