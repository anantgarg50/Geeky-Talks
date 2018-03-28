<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer width="250" temporary app v-model="drawerToggle">
        <v-card tile>
          <v-list class="blue darken-2" dark three-line>
            <v-list-tile class="mt-2">
              <v-list-tile-avatar size="75" class="ml-3 pt-4">
                <v-icon size="75px">fas fa-user-circle</v-icon>
              </v-list-tile-avatar>
            </v-list-tile>
            <v-list-tile-content v-if="userLoggedIn" class="ml-4 my-2">
              <span class="body-1 pl-3">{{ displayName }}</span>
              <span class="caption pl-3">@{{ username }}</span>
            </v-list-tile-content>
            <v-list-tile-content  v-else class="ml-4 my-2">
              <v-btn color="grey darken-3" @click="userLoggedIn = !userLoggedIn">Sign in</v-btn>
            </v-list-tile-content>  
          </v-list>
        </v-card>
        <v-list subheader>
          <v-list-tile v-for="navbarLinks in navbarLinks" :key="navbarLinks.icon"
            @click.stop="changeToolbarTitle">
            <v-list-tile-action>
              <v-icon>{{ navbarLinks.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ navbarLinks.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="blue darken-3" app dark>
        <v-btn icon @click.stop="drawerToggle = !drawerToggle">
          <v-icon>fas fa-bars</v-icon>
        </v-btn>
        <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu origin="top right" transition="scale-transition">
          <v-btn icon slot="activator" dark>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list  v-if="userLoggedIn">
            <v-list-tile v-for="item in toolbarMenuUser" :key="item" @click="true">
              <v-list-tile-title>{{ item }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-list  v-else>
            <v-list-tile v-for="item in toolbarMenuAnonymous" :key="item" @click="true">
              <v-list-tile-title>{{ item }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>
      <v-content>
        <router-view></router-view>
      </v-content>
      <v-footer inset dark class="grey darken-4" height="auto">
        <v-container fluid pa-0>
          <v-layout wrap row pb-1 align-center justify-center>
            <v-flex xs12>
              <v-layout wrap justify-center>
                <v-btn color="white" flat 
                  v-for="link in links" :key="link">
                  {{ link }}
                </v-btn>
                <v-tooltip top color="blue darken-4">
                  <v-btn slot="activator" color="white--text" icon>  
                    <v-icon size="30px">code</v-icon>
                  </v-btn>
                  <span>See Source</span>
                </v-tooltip>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-flex xs12 py-2 text-xs-center white--text>
            <strong style="font-family: Changa;">
              Made using <v-icon size="30px">fab fa-vuejs</v-icon>ue.js in Chitkara Univeristy
            </strong> 
          </v-flex>
        </v-container>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      drawerToggle: false,
      toolbarTitle: "Home",
      userLoggedIn: false,
      displayName: "custom name",
      username: "custom username",
      toolbarMenuAnonymous: ["Sign In", "Register"],
      toolbarMenuUser: ["Settings", "Logout"],
      navbarLinks: [
        {
          icon: "fas fa-home",
          name: "Home"
        },
        {
          icon: "fas fa-comments",
          name: "Discussion"
        },
        {
          icon: "fas fa-user",
          name: "Profile"
        },
        {
          icon: "fas fa-edit",
          name: "Feedback"
        },
        {
          icon: "fas fa-address-card",
          name: "Contact Us"
        },
        {
          icon: "fas fa-info-circle",
          name: "About Us"
        }
      ],
      links: [
        "Home",
        "Discussion",
        "Feedback",
        "Contact Us",
        "About Us",
        "Terms",
        "Donate"
      ]
    };
  },
  methods: {
    changeToolbarTitle: function(event) {
      this.toolbarTitle = event.target.innerText;
      this.drawerToggle = !this.drawerToggle;
    }
  }
};
</script>


