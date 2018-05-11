<template>
  <v-container>
    <v-layout column mb-4>
      <v-text-field prepend-icon="search" clearable
        label="Search for queries"
        solo-inverted single-line v-model="searchText"></v-text-field>
    </v-layout>
    <v-layout justify-center column>
      <v-subheader>Recent Queries</v-subheader>
      <v-expansion-panel popout>
        <v-expansion-panel-content
          v-for="(message, i) in messages"
          :key="i"
          hide-actions
        >
          <v-layout slot="header" align-center row spacer>
            <v-flex xs4 sm2 md1>
            </v-flex>
            <v-flex sm5 md3 hidden-xs-only>
              <strong v-html="message.postedBy"></strong>
            </v-flex>
            <v-flex no-wrap xs5 sm3>
              <strong v-html="message.title"></strong>
            </v-flex>
            <v-flex
              v-if="message.description"
              class="grey--text"
              ellipsis
              hidden-sm-and-down
            >
              &mdash;
              {{ message.description }}
            </v-flex>
          </v-layout>
          <v-card>
            <v-divider></v-divider>
            <v-card-text v-text="message.fullText"></v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "LandingPage",
  data: () => {
    return {
      searchText: "",
      messages: [
        {
          postedBy: "Anant Garg",
          title: "Welcome to GeekyTalks!",
          description: "Thank you for joining our community...!",
          fullText:
            "Lorem ipsum dolor sit amet, at aliquam vivendum vel" +
            "everti delicatissimi cu eos. Dico iuvaret debitis mel an" +
            "et cum zril menandri. Eum in consul legimus accusam." +
            "Ea dico abhorreant duo, quo illum minimum incorrupte no," +
            "nostro voluptaria sea eu. Suas eligendi ius at," +
            "at nemore equidem est. Sed in error hendrerit, in consul constituam cum."
        },
        {
          postedBy: "Ashmit Bakshi",
          title: "We're here to help!",
          description: "Let me tell you something!",
          fullText:
            "Lorem ipsum dolor sit amet, at aliquam vivendum vel" +
            "everti delicatissimi cu eos. Dico iuvaret debitis mel an" +
            "et cum zril menandri. Eum in consul legimus accusam." +
            "Ea dico abhorreant duo, quo illum minimum incorrupte no," +
            "nostro voluptaria sea eu. Suas eligendi ius at," +
            "at nemore equidem est. Sed in error hendrerit, in consul constituam cum."
        },
        {
          postedBy: "Akash Rana",
          title: "Always there for support!",
          description: "keep learning...",
          fullText:
            "Lorem ipsum dolor sit amet, at aliquam vivendum vel" +
            "everti delicatissimi cu eos. Dico iuvaret debitis mel an" +
            "et cum zril menandri. Eum in consul legimus accusam." +
            "Ea dico abhorreant duo, quo illum minimum incorrupte no," +
            "nostro voluptaria sea eu. Suas eligendi ius at," +
            "at nemore equidem est. Sed in error hendrerit, in consul constituam cum."
        },
        {
          postedBy: "Uday",
          title: "Clear you doubts!",
          description: "Have a Doubt? Ask here!",
          fullText:
            "Lorem ipsum dolor sit amet, at aliquam vivendum vel" +
            "everti delicatissimi cu eos. Dico iuvaret debitis mel an" +
            "et cum zril menandri. Eum in consul legimus accusam." +
            "Ea dico abhorreant duo, quo illum minimum incorrupte no," +
            "nostro voluptaria sea eu. Suas eligendi ius at," +
            "at nemore equidem est. Sed in error hendrerit, in consul constituam cum."
        },
        {
          postedBy: "Anant Garg",
          title: "Guess what!",
          description: "You can use this on mobile as well!",
          fullText:
            "Lorem ipsum dolor sit amet, at aliquam vivendum vel" +
            "everti delicatissimi cu eos. Dico iuvaret debitis mel an" +
            "et cum zril menandri. Eum in consul legimus accusam." +
            "Ea dico abhorreant duo, quo illum minimum incorrupte no," +
            "nostro voluptaria sea eu. Suas eligendi ius at," +
            "at nemore equidem est. Sed in error hendrerit, in consul constituam cum."
        }
      ]
    };
  }
};
</script>
