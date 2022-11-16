import {
  ChangeEvent,
  MouseEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { MdFavorite, MdStar, MdStarOutline, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import UserDefault from "../../assets/imagenesSlider/defaultuser.jpg";
import Navbar from "../../components/Tugamer/Navbar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createReview,
  detailProduct,
  editReview,
  getProductId,
  ProductDetail,
  ReviewType,
} from "../../features/products/productSlice";
import {
  selectors as userSelectors,
  UserType,
} from "../../features/users/userSlice";
import {
  actions as cartActions,
  helpers as cartHelpers,
} from "../../features/cart/cartSlice";

const { getItemQuantity } = cartHelpers;
const { incrementItemQuantity, decrementItemQuantity } = cartActions;
const { selectUser } = userSelectors;

const Detalle = () => {
  const [active, setActive] = useState(false);
  const [edit, setEdit] = useState(false);
  const [review, setReview] = useState({
    id: "",
    score: 0,
    body: "",
  });
  const { productId } = useParams<{ productId?: string }>();
  const { isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();
  const detalle = useAppSelector(detailProduct) as ProductDetail;
  const quantity = useAppSelector(getItemQuantity(detalle));
  const user = useAppSelector(selectUser) as UserType;

  const successAlert = () => {
    Swal.fire({
      title: "Review Creada",
      text: "Se ha creado la review con exito.",
      icon: "success",
      confirmButtonText: "Volver",
    });
  };

  const errorAlert = () => {
    Swal.fire({
      title: "Error",
      text: "Faltan datos",
      icon: "error",
      confirmButtonText: "Ok!",
    });
  };

  const handleActive = () => {
    setActive(!active);
  };

  const handleScore = (score: number) => {
    setReview({ ...review, score });
  };

  const handleBody = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmitReview = (e: SyntheticEvent) => {
    e.preventDefault();

    if (review.score === 0 || review.body === "") {
      errorAlert();
    } else if (user.id && productId) {
      dispatch(createReview({ userId: user.id, productId, review }));
      successAlert();
    }
  };

  const handleEdit =
    (review: ReviewType): MouseEventHandler<HTMLDivElement> =>
    () => {
      if (edit) {
        setReview({
          id: "",
          score: 0,
          body: "",
        });
        setEdit(false);
      } else {
        setReview({
          id: review.id,
          score: review.score,
          body: review.body,
        });
        setEdit(true);
      }
    };

  const handleSubmitEdit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (review.score === 0 || review.body === "") {
      errorAlert();
    } else if (user.id && productId) {
      dispatch(editReview(review));
      successAlert();
      setEdit(false);
      dispatch(getProductId(productId));
    }
  };

  const reviewCard = (reviewCard: ReviewType) => (
    <ReviewCard
      key={reviewCard.id}
      isHidden={isAuthenticated && reviewCard.user.id === user?.id && edit}
    >
      <ReviewInfo>
        <ReviewUserInfo>
          <ReviewImage
            referrerPolicy="no-referrer"
            src={reviewCard.user.imagenDePerfil || UserDefault}
            alt={reviewCard.user.username || ""}
          />
          <ReviewUserText>
            <h4>{reviewCard.user.username || reviewCard.user.firstName}</h4>
            <h4 style={{ fontWeight: 500, color: "gray" }}>
              {reviewCard.user.email}
            </h4>
          </ReviewUserText>
        </ReviewUserInfo>
        {isAuthenticated && reviewCard.user.id === user.id ? (
          <ReviewEditWrapper onClick={handleEdit(reviewCard)}>
            <MdEdit />
          </ReviewEditWrapper>
        ) : null}
        <ReviewRate>
          {[...Array(5)].map((_, index) =>
            index + 1 <= reviewCard.score ? <MdStar /> : <MdStarOutline />
          )}
        </ReviewRate>
      </ReviewInfo>
      <p>{reviewCard.body}</p>
    </ReviewCard>
  );

  const reviewCards = (reviews: ReviewType[]) => {
    if (reviews.findIndex((rev) => rev.user.id === user.id) > -1) {
      const shiftedArray = [...reviews];
      const userReviewIndex = reviews.findIndex(
        (rev) => rev.user.id === user.id
      );
      shiftedArray.unshift(shiftedArray.splice(userReviewIndex, 1)[0]);
      return shiftedArray.map((rev) => reviewCard(rev));
    } else {
      return reviews.map((rev) => reviewCard(rev));
    }
  };

  useEffect(() => {
    dispatch(getProductId(productId));
  }, [productId]);

  if (productId) {
    return (
      <>
        <Navbar />
        <DetalleContainer>
          <div className="cajita__maxima">
            <div className="imagen__caja">
              <div className="det_fot">
                <img src={detalle.image} alt="producto" className="det__img1" />
              </div>
            </div>
            <div className="det__container">
              <div className="det_props">
                <div className="det__dec">{detalle.name}</div>
                <div className="det__dec0">
                  valor de: {detalle.price_local} $
                </div>
                <div className="det__dec2">
                  Descripción: {detalle.description}
                </div>
              </div>
              <div className="det_cant">
                <div className="det__cant2">
                  <div className="det__dec3">
                    Cantidad en stock: {detalle.stock - quantity}
                  </div>
                  <div className="det__dec4">Cantidad que desea comprar:</div>
                  <div className="botones">
                    <button
                      disabled={quantity === 0}
                      onClick={() => dispatch(decrementItemQuantity(detalle))}
                      className="button__card"
                    >
                      {" "}
                      -{" "}
                    </button>
                    <h3 className="count">{quantity}</h3>

                    <button
                      disabled={!(detalle.stock - quantity > 0)}
                      onClick={() => dispatch(incrementItemQuantity(detalle))}
                      className="button__card"
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </div>
                <div className="button__card__container">
                  <button className="button__card">COMPRAR AHORA</button>
                </div>
              </div>
            </div>
          </div>
          {(isAuthenticated &&
            detalle.reviews.findIndex((rev) => rev.user.id === user.id) ===
              -1) ||
          edit ? (
            <ReviewCard>
              <h3 style={{ alignSelf: "center" }}>
                {edit ? "Editar Review" : "Crear una nueva Review"}
              </h3>
              <ReviewInfo>
                <ReviewUserInfo>
                  <ReviewImage
                    referrerPolicy="no-referrer"
                    src={user.imagenDePerfil || UserDefault}
                    alt={user.username || ""}
                  />
                  <ReviewUserText>
                    <h4>{user.username || user.firstName}</h4>
                    <h4 style={{ fontWeight: 500, color: "gray" }}>
                      {user.email}
                    </h4>
                  </ReviewUserText>
                </ReviewUserInfo>
                <ReviewRate>
                  {[...Array(5)].map((_, index) =>
                    index + 1 <= review.score ? (
                      <MdStar
                        style={{ cursor: "pointer" }}
                        onClick={() => handleScore(index + 1)}
                      />
                    ) : (
                      <MdStarOutline
                        style={{ cursor: "pointer" }}
                        onClick={() => handleScore(index + 1)}
                      />
                    )
                  )}
                </ReviewRate>
              </ReviewInfo>
              <ReviewInput
                name="body"
                value={review.body}
                onChange={handleBody}
              />
              <button
                className="button__card"
                style={{ alignSelf: "flex-end" }}
                onClick={edit ? handleSubmitEdit : handleSubmitReview}
              >
                {edit ? "EDITAR" : "CREAR REVIEW"}
              </button>
            </ReviewCard>
          ) : null}
          {detalle.reviews === undefined ? (
            <ReviewCard>
              <h2>Cargando</h2>
            </ReviewCard>
          ) : detalle.reviews.length > 0 ? (
            reviewCards(detalle.reviews)
          ) : (
            <ReviewCard>
              <h2>No hay reviews para este producto</h2>
            </ReviewCard>
          )}
        </DetalleContainer>
      </>
    );
  } else {
    return <div>Loading ...</div>;
  }
};
export default Detalle;

const DetalleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  gap: 32px;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding-top: 100px;

  .cajita__maxima {
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid ${({ theme }) => theme.border}; */
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 20px;
  }

  .imagen__caja {
    display: flex;
    margin-right: 20px;
    align-items: center;
    justify-content: center;
  }

  .det__container {
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 20px;
  }

  .fav {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
  }

  .det_fot {
    width: 200px;
    border-radius: 10px;
    margin: 10px;

    .det__img1 {
      padding: 5px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .det__dec {
    text-align: start;
    font-size: 30px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .det__dec2,
  .det__dec3,
  .det__dec4 {
    margin-bottom: 10px;
  }

  .det__dec0 {
    text-align: start;
    margin-bottom: 10px;
  }

  .det_props {
    width: 500px;
  }

  .count {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .botones {
    width: 500px;
    display: flex;
    margin-bottom: 10px;
    justify-content: space-around;
  }

  .button__card__container {
    display: flex;
    gap: 16px;
    align-items: center;
    justify-content: center;
  }

  .button__card {
    background-color: ${({ theme }) => theme.primary};
    border: transparent;
    padding: 5px 10px;
    color: ${({ theme }) => theme.light};
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      border: transparent;
    }
    &:focus {
      border: transparent;
    }
  }

  .det_fav {
    path {
      color: ${({ theme }) => theme.tertiary};
      cursor: pointer;
      transition: 0.5s;
      &:hover {
        color: #a35454;
        opacity: 0.7;
      }
    }
  }

  .active {
    path {
      color: ${({ theme }) => theme.error};
      &:hover {
        color: ${({ theme }) => theme.error};
      }
    }
  }

  @media screen and (max-width: 855px) {
    .cajita__maxima {
      flex-direction: column-reverse;
      width: 90%;
    }

    .imagen__caja {
      margin: 0;
    }

    .det_fot {
      width: 90%;
    }

    .det_props {
      width: 100%;
    }

    .det_cant {
      width: 100%;
    }

    .botones {
      width: 100%;
    }
  }

  @media screen and (max-width: 500px) {
    .det__dec {
      text-align: center;
    }

    .det__dec0 {
      text-align: center;
    }

    .det__dec2 {
      text-align: center;
    }

    .det__dec3 {
      text-align: center;
    }

    .det__dec4 {
      text-align: center;
    }
  }
`;

type ReviewCardProps = {
  readonly isHidden?: boolean;
};

const ReviewCard = styled.div<ReviewCardProps>`
  display: ${({ isHidden }) => (isHidden ? "none" : "flex")};
  flex-flow: column wrap;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  width: 100%;
  max-width: 720px;
  height: fit-content;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: white;
  border-radius: 20px;
`;

const ReviewInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row wrap;
  width: 100%;
  height: fit-content;
`;

const ReviewUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-flow: row wrap;
  height: 100%;
`;

const ReviewUserText = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 4px;
  height: fit-content;
  width: fit-content;
`;

const ReviewImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50px;
`;

const ReviewRate = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: yellow;
  font-size: 24px;
`;

const ReviewEditWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 100%;
  color: lightgray;
  font-size: 32px;
  cursor: pointer;
`;

const ReviewInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  background: #fafafa;
  border: none;
  border-radius: 5px;
`;
