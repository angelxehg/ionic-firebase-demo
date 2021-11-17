export const mockAngularFireAuth = {
  currentUser: new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, 250);
  })
};
