<template>
  <v-container>
		<v-layout column>
			<v-card>
			<v-card-title class="primary-title">
				<v-layout justify-center>
					<strong style="font-family: sanchez; font-size: 2.5em">Terms of Usage</strong>
				</v-layout>
			</v-card-title>
			<v-card-text style="text-align: center; font-size: 1.5em">
        The user must agree to our terms and conditions before registering on this Web-App.        
			</v-card-text>
			<v-card-text>
        <v-container>
          <v-layout justify-center>
            <ul>
              <li>You should be a part of Chitkara University.</li>
              <li>Any kind of rude behaviour, abusive language will lead to the suspension of the account.</li>
              <li>We don't review or edit user content, but reserves the right to remove or disable
                access to any user content for any or no reason.
              </li>
              <li>Your Password protects your user account, and you're solely responsible for keeping 
                your password secure and confidential</li>
            </ul>
          </v-layout>
        </v-container>
      </v-card-text>
			</v-card>
  </v-layout>
	</v-container>
</template>

<script>
export default {};
</script>

<style scoped>
ul {
  padding-left: 0;
}
ul li {
  list-style-type: inside;
  font-size: 1.2em;
}
</style>
