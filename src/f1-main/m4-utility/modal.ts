import Swal from "sweetalert2";
import {
  addPackTC,
  deletePacksTC,
  editPackTC,
} from "../m2-bll/reducers/packsReducer/packsReducer";
import {
  addCardTC,
  deleteCardTC,
  editCardTC,
} from "../m2-bll/reducers/cardsReducer/cardsReducer";

export const fireDeleteModal = (
  idPack: string,
  namePack: string,
  dispatch: any
) =>
  Swal.fire({
    title: "Are you sure?",
    text: `You won't be able to revert ${namePack}`,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deletePacksTC(idPack));
      Swal.fire("Deleted!", "Your file has been deleted.");
    }
  });

export const fireEditPackModal = async (
  packId: string,
  packName: string,
  dispatch: any
) => {
  const { value: value } = await Swal.fire({
    title: `Are you sure you want to edit ${packName}`,
    input: "text",
    inputPlaceholder: "Enter new pack name",
  });

  if (value) {
    dispatch(editPackTC(packId, value));
    Swal.fire(`Pack name changed successfully`);
  }
};

export const fireAddPackModal = async (dispatch: any) => {
  const { value: value } = await Swal.fire({
    title: `Create new pack`,
    input: "text",
    inputPlaceholder: "Enter new pack name",
    confirmButtonText: "Create",
    confirmButtonColor: "#3085d6",
  });

  if (value) {
    dispatch(addPackTC(value));
    Swal.fire(`Pack created successfully`);
  }
};

// Cards Modal

export const fireAddCardModal = async (packId: string, dispatch: any) => {
  const { value: formValues } = await Swal.fire({
    title: "Create new card",
    html:
      '<input placeholder="Enter new question"' +
      ' id="swal-input1" class="swal2-input">' +
      '<input placeholder="Enter new answer"' +
      ' id="swal-input2" class="swal2-input">',
    focusConfirm: false,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Create",
    preConfirm: () => {
      return [
        //@ts-ignore
        document.getElementById("swal-input1").value,
        //@ts-ignore
        document.getElementById("swal-input2").value,
      ];
    },
  });

  if (formValues) {
    dispatch(addCardTC(packId, formValues[0], formValues[1]));
    Swal.fire(`Card has been created`);
  }
};

export const fireDeleteCardModal = (
  packId: string,
  cardId: string,
  dispatch: any
) =>
  Swal.fire({
    title: `Are you sure?`,
    text: `You won't be able to revert this item`,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deleteCardTC(packId, cardId));
      Swal.fire("Deleted!", "Your file has been deleted.");
    }
  });

export const fireEditCardModal = async (
  cardId: string,
  packId: string,
  dispatch: any
) => {
  const { value: formValues } = await Swal.fire({
    title: "Edit card",
    html:
      '<input placeholder="Enter new question"' +
      ' id="swal-input3" class="swal2-input">' +
      '<input placeholder="Enter new answer"' +
      ' id="swal-input4" class="swal2-input">',
    focusConfirm: false,
    confirmButtonText: "Update",
    preConfirm: () => {
      return [
        //@ts-ignore
        document.getElementById("swal-input3").value,
        //@ts-ignore
        document.getElementById("swal-input4").value,
      ];
    },
  });

  if (formValues) {
    dispatch(editCardTC(cardId, formValues[0], formValues[1], packId));
    Swal.fire(`Card has been updated`);
  }
};
