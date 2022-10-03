import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { postData } from '../../../utils/apiCall';

const AttributesFilter = ({
  selectedAttributes = [],
  setSelectedAttributes,
  setFilterAttributes,
}) => {
  const searchParams = useLocation().search;
  const catId = new URLSearchParams(searchParams).get('catId');
  const sub_catId = new URLSearchParams(searchParams).get('sub_catId');
  const [attributes, setAttributes] = useState([]);
  const getAttributes = async ({ catId, sub_catId }) => {
    const params = new URLSearchParams();
    catId && params.append('category_id', catId);
    sub_catId && params.append('subcategory_id', sub_catId);
    const res = await postData('/attributes/getAttributeFilter', params);
    if (res?.success === 1) {
      setAttributes(res?.data || []);
    }
  };
  useEffect(() => {
    getAttributes({ catId, sub_catId });
  }, [catId, sub_catId]);
  return (
    <>
      <div className='single__widget widget__bg'>
        <h2 className='widget__title h3'>Attributes</h2>
        <ul className='widget__tagcloud'>
          {attributes.length > 0 &&
            attributes.map((attribute, index) => (
              <li className='widget__tagcloud--list' key={index}>
                <div className='attribute-title'>{attribute?.name}</div>
                <div className='d-flex flex-wrap'>
                  {attribute?.attribute_values?.length > 0 &&
                    attribute.attribute_values.map(({ id, attribute_value }) => (
                      <>
                        <span className='widget__tagcloud--link mr-10 mt-10'>
                          {' '}
                          <input
                            name={attribute_value}
                            id={attribute_value + '-' + attribute.id}
                            type={'checkbox'}
                            value={attribute_value}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAttributes([...selectedAttributes, id]);
                              } else {
                                setSelectedAttributes(
                                  selectedAttributes.filter((attr) => attr !== id),
                                );
                              }
                            }}
                          />
                          &nbsp;
                          <label htmlFor={attribute_value + '-' + attribute.id}>
                            {attribute_value}
                          </label>
                        </span>
                      </>
                    ))}
                </div>
              </li>
            ))}
        </ul>
        {/* <button
          className={cx('price__filter--btn primary__btn', {
            disabled: selectedAttributes?.length === 0,
          })}
          type='button'
          disabled={selectedAttributes?.length === 0}
          onClick={(e) => {
            e.preventDefault();
            if (selectedAttributes?.length > 0) setFilterAttributes(true);
          }}
        >
          Filter
        </button> */}
      </div>
    </>
  );
};

export default AttributesFilter;
