export default function toast(message = "", type = "error", duration = 1500) {
  this.$Message({
    message,
    type,
    duration
  });
}
