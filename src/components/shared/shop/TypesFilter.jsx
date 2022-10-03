import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { postData } from '../../../utils/apiCall';

const TypesFilter = ({ selectedTypes = [], setSelectedTypes, setFilterAttributes }) => {
  const [types, setTypes] = useState([]);
  const searchParams = useLocation().search;
  const catId = new URLSearchParams(searchParams).get('catId');
  const sub_catId = new URLSearchParams(searchParams).get('sub_catId');
  const getTypes = async ({ catId, sub_catId }) => {
    const params = new URLSearchParams();
    catId && params.append('category_id', catId);
    sub_catId && params.append('subcategory_id', sub_catId);
    const res = await postData('/types/getTypeByCategory', params);
    if (res?.success === 1) {
      setTypes(res?.data || []);
    }
  };
  useEffect(() => {
    getTypes({ catId, sub_catId });
  }, [catId, sub_catId]);
  return (
    <>
      <div className='single__widget widget__bg'>
        <h2 className='widget__title h3'>Types</h2>
        <ul className='widget__tagcloud'>
          {types.length > 0 &&
            types.map(({ id, name, type_values }, index) => (
              <li className='widget__tagcloud--list' key={index}>
                <div className='attribute-title'>{name}</div>
                <div className='d-flex flex-wrap'>
                  {type_values?.length > 0 &&
                    type_values.map(({ id, type_value }) => (
                      <>
                        <span className='widget__tagcloud--link mr-10 mt-10'>
                          {' '}
                          <input
                            name={type_value}
                            id={type_value + '-' + id}
                            type={'checkbox'}
                            value={type_value}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTypes([...selectedTypes, id]);
                              } else {
                                setSelectedTypes(selectedTypes.filter((attr) => attr !== id));
                              }
                            }}
                          />
                          &nbsp;
                          <label htmlFor={type_value + '-' + id}>{type_value}</label>
                        </span>
                      </>
                    ))}
                </div>
              </li>
            ))}
        </ul>
        {/* <button
          className={cx('price__filter--btn primary__btn', {
            disabled: selectedTypes?.length === 0,
          })}
          type='button'
          disabled={selectedTypes?.length === 0}
          onClick={(e) => {
            e.preventDefault();
            if (selectedTypes?.length > 0) setFilterAttributes(true);
          }}
        >
          Filter
        </button> */}
      </div>
    </>
  );
};

export default TypesFilter;
