import { useState, useEffect, useMemo, useCallback } from "react";
import { getContact } from "../Services/BaseApi";

export const useContactListHook = () => {

  const [contact, setContact] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debounceSearch, setDebounceSearch] = useState('');
  const [search, setSearch] = useState('');

  const fetchContact = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getContact();
      setContact(response.data);
    } catch (err) {
        setError(err.message)
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const filteredContact = useMemo(() => {
    return contact.filter((c) =>
      c.title.toLowerCase().includes(debounceSearch.toLowerCase()),
    );
  }, [contact, debounceSearch]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounceSearch(search);
    }, 500);
    return () => clearTimeout(handle);
  }, [search]);

  return { contact: filteredContact, isLoading, error, setSearch, search };
};
