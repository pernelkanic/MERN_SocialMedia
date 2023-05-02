import { createSlice } from "@reduxjs/toolkit";

const initialstate={
  mode:'light',
  user:'null',
  token:'null',
  posts:[],
};

export const AuthSlice = createSlice({
  name:"auth",
  initialstate,
  reducers:{
    setMode: (state)=>{
      state.mode = state.mode === "light"?"dark":"light"

    },
    setLogin: (state,action)=>{
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state)=>{
      state.user =null
      state.token = null
    },
    setFriends:(state,action)=>{
      if(state.user){
        state.user.friends = action.payload.friends;
      }else{
        console.log("user friends non-existant");
      }

    },
    setPosts: (state,action)=>{
      state.posts = action.payload.posts
    },
    setPost:(state,action)=>{
      const uppost = state.posts.map((post)=>{
        if(post._id === action.payload._id)return action.payload.post;
        return post;
      })
        state.posts = uppost;
      }}}
)
export const {setMode , setPosts ,setFriends ,setPost ,setLogin ,setLogout} = AuthSlice.actions
export default AuthSlice.reducer;

