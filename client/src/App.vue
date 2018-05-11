<template>
  <div id="app">
    <v-app>

      <v-navigation-drawer width="250" temporary app v-model="drawerToggle">
        <v-card tile>
          <v-list class="blue darken-2" dark three-line>
            <v-list-tile class="mt-3">
              <v-list-tile-avatar size="75">
                <v-icon size="75px">fas fa-user-circle</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content v-if="userLoggedIn" class="my-2">
              <span class="body-1 pl-3">{{ displayName }}</span>
              <span class="caption pl-3">@{{ username }}</span>
            </v-list-tile-content>
             <v-list-tile-content v-else class="my-2">
              <span class="body-1 pl-3">Hey Stranger!</span>
            </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
        <v-list subheader>
          <v-list-tile v-for="navbarLinks in navbarLinks" :key="navbarLinks.icon"
            @click.stop="changeToolbarTitle" v-if="navDrawerItemRender(navbarLinks.name)">
            <v-list-tile-action>
              <v-icon>{{ navbarLinks.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ navbarLinks.name }}</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar color="blue darken-3" app dark>
        <v-btn icon @click.stop="drawerToggle = !drawerToggle">
          <v-icon>fas fa-bars</v-icon>
        </v-btn>
        <v-toolbar-title>GeekyTalks</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu origin="top right" transition="scale-transition">
          <v-btn icon slot="activator" dark>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list  v-if="userLoggedIn">
            <v-list-tile v-for="item in toolbarMenuUser" :key="item.name" @click= "item.action.call($data)">
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-list v-else>
            <v-list-tile v-for="item in toolbarMenuAnonymous" :key="item.name" @click= "item.action.call($data)">
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar>

      <login-dialog></login-dialog>

      <register-dialog></register-dialog>

      <v-content>
        <router-view></router-view>
      </v-content>

      <v-footer inset dark class="grey darken-4" height="auto">
        <v-container fluid pa-0>
          <v-layout wrap row pb-1 align-center justify-center>
            <v-flex xs12>
              <v-layout wrap justify-center>
                <v-btn color="white" flat 
                  v-for="links in links" :key="links.name">
                  {{ links.name }}
                </v-btn>
                <v-tooltip top color="blue darken-4">
                  <v-btn slot="activator" color="white--text" icon 
                    href="https://github.com/anantgarg50/Geeky-Talks">  
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
import { eventBus } from "./eventBus";
export default {
  name: "App",
  data: () => {
    return {
      drawerToggle: false,
      userLoggedIn: false,
      displayName: "custom name",
      username: "custom username",

      toolbarMenuAnonymous: [
        {
          name: "Login",
          action: function() {
            eventBus.$emit("loginDialog", true);
          }
        },
        {
          name: "Register",
          action: function() {
            eventBus.$emit("registerDialog", true);
          }
        }
      ],
      toolbarMenuUser: [
        {
          name: "My Account",
          action: function() {}
        },
        {
          name: "Logout",
          action: function() {
            this.userLoggedIn = false;
          }
        }
      ],
      navbarLinks: [
        {
          icon: "fas fa-home",
          name: "Home"
        },
        {
          icon: "fas fa-pencil-alt",
          name: "Create Post"
        },
        {
          icon: "fas fa-user",
          name: "My Account"
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
        {
          name: "Home",
          link: ""
        },
        {
          name: "Feedback",
          link: ""
        },
        {
          name: "Contact Us",
          link: ""
        },
        {
          name: "About Us",
          link: ""
        },
        {
          name: "Terms",
          link: ""
        },
        {
          name: "Donate",
          link: ""
        }
      ]
    };
  },
  methods: {
    openRegisterDialog: function() {
      eventBus.$emit("registerDialog", true);
    },

    navDrawerItemRender: function(item) {
      if (item == "My Account" || item == "Create Post") {
        return this.userLoggedIn;
      } else {
        return true;
      }
    }
  },

  created() {
    var vm = this;
    eventBus.$on("userLoggedIn", value => {
      vm.userLoggedIn = value;
    });
  }
};
</script>


