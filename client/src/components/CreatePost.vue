<template>
	<v-container>
		<v-flex my-5>
		<v-card>
			<v-card-title class="primary-title">
				<v-layout justify-center>
					<span class="headline">Create Post</span>
				</v-layout>
			</v-card-title>
			<v-alert class="mx-3"
				:value="alert.visible" 
				:color="alert.color" 
				transition="scale-transition">
				{{alert.message}}
			</v-alert>
			<v-form v-model="valid" ref="createPostForm" lazy-validation>
				<v-card-text class="pt-0">
					<v-container class="pt-0" grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
								<v-text-field label="Title of the Post" required v-model="query.title"
									:rules="[rules.required]"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="Description" textarea 
                  required rows="10" v-model="query.description"
									:rules="[rules.required]"></v-text-field>
							</v-flex>
						</v-layout>
					</v-container>
					<small>*indicates required field</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat @click.native="reset">Reset</v-btn>
					<v-btn color="blue darken-1" flat @click.native="createPost">Submit</v-btn>
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
      query: {
        title: "",
        description: ""
      },
      rules: {
        required: value => !!value || "This field is required."
      }
    };
  },

  methods: {
    createPost() {
      if (this.$refs.createPostForm.validate()) {
        this.alert.message = "Post Created!";
        this.alert.color = "success";
        this.alert.visible = true;

        setTimeout(() => {
          this.alert.visible = false;
        }, 3000);

        this.$refs.createPostForm.reset();
      }
    },

    reset() {
      this.$refs.createPostForm.reset();
      this.alert.visible = false;
    }
  }
};
</script>