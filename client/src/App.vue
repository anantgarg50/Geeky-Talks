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
            <v-list-tile-content v-else class="ml-3 my-0">
              <v-btn class="light-blue accent-4" flat @click="openLoginDialog">Login</v-btn>
            </v-list-tile-content>  
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
        <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
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

      <v-dialog v-model="loginDialog" persistent max-width="350px">
        <v-card>
          <v-card-title class="primary-title">
            <v-layout justify-center>
              <span class="headline">Login</span>
            </v-layout>
          </v-card-title>
          <v-card-text class="pt-0">
            <v-container class="pt-0" grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password" type="password" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="loginDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="registerDialog" persistent max-width="350px">
        <v-card>
          <v-card-title class="primary-title">
            <v-layout justify-center>
              <span class="headline">Register</span>
            </v-layout>
          </v-card-title>
          <v-card-text class="pt-0">
            <v-container class="pt-0" grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Name" v-model="userData.name" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Email" v-model="userData.email" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password" type="password" v-model="userData.password" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Confirm Password" v-model="userData.confirmPassword"
                   type="password" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="registerDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.native="registerUser">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
import RegisterService from "@/services/RegisterService";
export default {
  name: "App",
  data: () => {
    return {
      userData: {
        name: "",
        email: "",
        password: "",
        confirmPassword: null
      },
      drawerToggle: false,
      toolbarTitle: "Home",
      userLoggedIn: false,
      displayName: "custom name",
      username: "custom username",
      loginDialog: false,
      registerDialog: false,
      toolbarMenuAnonymous: [
        {
          name: "Login",
          action: function() {
            this.loginDialog = true;
          }
        },
        {
          name: "Register",
          action: function() {
            this.registerDialog = true;
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
      links: ["Home", "Feedback", "Contact Us", "About Us", "Terms", "Donate"]
    };
  },
  methods: {
    changeToolbarTitle: function(event) {
      if (event.target.className == "list__tile__action") {
        this.toolbarTitle = event.target.parentElement.innerText;
      } else if (
        event.target.className == "list__tile__content" ||
        event.target.className == "list__tile list__tile--link"
      ) {
        this.toolbarTitle = event.target.innerText;
      } else {
        this.toolbarTitle =
          event.target.parentElement.parentElement.parentElement.innerText;
      }

      this.drawerToggle = !this.drawerToggle;
    },

    openLoginDialog: function() {
      this.loginDialog = true;
      this.drawerToggle = false;
    },

    login: function() {
      this.loginDialog = false;
      this.userLoggedIn = true;
    },

    navDrawerItemRender: function(item) {
      if (item == "My Account") {
        return this.userLoggedIn;
      } else {
        return true;
      }
    },

    async registerUser() {
      const response = await RegisterService.register(this.userData);
      console.log(response);
    }
  }
};
</script>


