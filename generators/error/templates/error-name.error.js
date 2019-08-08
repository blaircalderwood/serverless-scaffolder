exports.<%= className %> = class extends Error {
  constructor() {
  super();
  this.errorMessage = '<%= errorMessage %>';
}};