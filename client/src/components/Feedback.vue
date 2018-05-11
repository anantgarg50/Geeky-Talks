<template>
	<v-container>
		<v-flex my-5>
		<v-card>
			<v-card-title class="primary-title">
				<v-layout justify-center>
					<span class="headline">Feedback</span>
				</v-layout>
			</v-card-title>
			<v-alert class="mx-3"
				:value="alert.visible" 
				:color="alert.color" 
				transition="scale-transition">
				{{alert.message}}
			</v-alert>
			<v-form v-model="valid" ref="feedbackForm" lazy-validation>
				<v-card-text class="pt-0">
					<v-container class="pt-0" grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
								<v-text-field label="Name" required v-model=" userFeedback.city"
									:rules="[rules.required]"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="E-mail" required v-model=" userFeedback.name"
									:rules="[rules.required, rules.email]"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="Feedback" required textarea rows="8"
                  :rules="[rules.required]" v-model=" userFeedback.feedback"></v-text-field>
							</v-flex>
							<v-flex xs7 md9 lg10>
								<v-slider label="Rating" v-model=" userFeedback.rating"
								 max="5" min="0" step="0.1"></v-slider>
							</v-flex>
							<v-flex xs5 md3 lg2>
								<v-text-field v-model=" userFeedback.rating" solo prepend-icon="star" readonly disabled></v-text-field>
							</v-flex>
						</v-layout>
					</v-container>
					<small>*indicates required field</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click.native="reset">Reset</v-btn>
					<v-btn color="blue darken-1" flat @click.native="submitFeedback">Submit</v-btn>
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
      userFeedback: {
        name: "",
        email: "",
        feedback: "",
        rating: 0
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
    submitFeedback() {
      if (this.$refs.feedbackForm.validate()) {
        this.alert.message = "Thanks...for your precious Feedback!";
        this.alert.color = "success";
        this.alert.visible = true;

        setTimeout(() => {
          this.alert.visible = false;
        }, 3000);

        this.$refs.feedbackForm.reset();
        this.userFeedback.rating = 0;
      }
    },

    reset: function() {
      this.$refs.feedbackForm.reset();
      this.userFeedback.rating = 0;
      this.alert.visible = false;
    }
  }
};
</script>
