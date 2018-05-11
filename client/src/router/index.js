import Vue from "vue";
import Router from "vue-router";
import HomePage from "@/components/HomePage";
import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";
import CreatePost from "@/components/CreatePost";
import Donate from "@/components/Donate";
import Feedback from "@/components/Feedback";
import MyAccount from "@/components/MyAccount";
import Terms from "@/components/Terms";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage
    },
    {
      path: "/about-us",
      name: "AboutUs",
      component: AboutUs
    },
    {
      path: "/contact-us",
      name: "ContactUs",
      component: ContactUs
    },
    {
      path: "/create-post",
      name: "CreatePost",
      component: CreatePost
    },
    {
      path: "/donate",
      name: "Donate",
      component: Donate
    },
    {
      path: "/feedback",
      name: "Feedback",
      component: Feedback
    },
    {
      path: "/my-account",
      name: "MyAccount",
      component: MyAccount
    },
    {
      path: "/terms",
      name: "Terms",
      component: Terms
    }
  ]
});
