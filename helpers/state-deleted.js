'use strict';



const switchToDeleteState = async (id) =>
  await User.findByIdAndUpdate(id, { state: false });
