import {create} from "zustand";

const useMessageStore = create((set) => ({
  messages: [],
  unreadCount: 0,
  add: (message) => set(state => ({messages: [message, ...state.messages]})),
  remove: (id) => set(state => ({messages: state.messages.filter(m => m.id !== id)})),
  set: (messages) => set({messages}),
  updateUnreadCount: (amount) => set(state => ({unreadCount: state.unreadCount + amount})),
}), {name: "messageStoreDemo"});

export default useMessageStore;