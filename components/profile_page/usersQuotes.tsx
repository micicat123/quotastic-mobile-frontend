import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { Quote } from '../../models/quote';
import CreateCardFromQuote from '../common/createCardFromQuote';
import { Theme, customStyles } from '../../config/theme.config';
import { GetUserStore } from '../../api/user/get_user';
import { getVote, getVotes } from '../../common/functions/voting';
import { checkForUser } from '../../common/functions/user';

const UserQuotes = ({ userId }) => {
  const [quotes, setQuotes] = useState<Set<Quote>>(new Set());
  const [userPictures, setUserPictures] = useState({});
  const [userVotes, setUserVotes] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const getUserStore = new GetUserStore();

  useEffect(() => {
    getVotes(setUserVotes);
    checkForUser(setIsLoggedIn);
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [page]);

  const fetchQuotes = async () => {
    try {
      //get quotes
      const fetchedQuotes: any = await getUserStore.getUserQuotes(page, userId);
      const newQuotesArray: Quote[] = [...quotes, ...fetchedQuotes.data.data];
      const newQuotesSet = new Set<Quote>(newQuotesArray);
      setQuotes(newQuotesSet);
      setIsLastPage(fetchedQuotes.data.isLastPage);

      //get pictures
      for (const quote of newQuotesSet) {
        const picture = await getUserStore.getUserPicture(quote.user.user_id);
        setUserPictures((prevPictures) => ({
          ...prevPictures,
          [quote.user.user_id]: picture,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!quotes || quotes.size < 1) {
    return <></>;
  } else {
    return (
      <View>
        <Text
          style={{
            marginTop: 64,
            fontSize: 27.5,
            fontWeight: '400',
            color: Theme.lightColors.primary,
            marginBottom: 25,
          }}
        >
          Most recent quotes
        </Text>
        {[...quotes].map((quote: Quote, index) => {
          const vote = getVote(quote.quote_id, userVotes);
          return (
            <View key={index}>
              <CreateCardFromQuote
                isLoggedIn={isLoggedIn}
                quote={quote}
                image={userPictures[quote.user.user_id]}
                vote={vote}
                quotes={quotes}
                setQuotes={setQuotes}
                userVotes={userVotes}
                setUserVotes={setUserVotes}
              />
            </View>
          );
        })}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 35,
          }}
        >
          {!isLoggedIn ? (
            <TouchableOpacity
              style={[customStyles.filledButton, { width: 165 }]}
              onPress={() => {
                setPage(page + 1);
                fetchQuotes();
              }}
            >
              <Text style={[customStyles.buttonText]}>Load more</Text>
            </TouchableOpacity>
          ) : !isLastPage ? (
            <TouchableOpacity
              style={[customStyles.filledButton, { width: 137 }]}
              onPress={() => {
                setPage(page + 1);
                fetchQuotes();
              }}
            >
              <Text style={[customStyles.buttonText]}>Load more</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
};

export default UserQuotes;
