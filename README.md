# RecursionForms

[![Build Status](https://travis-ci.com/yiqu/recursion-ng-forms.svg?branch=master)](https://travis-ci.com/yiqu/recursion-ng-forms)

## Form Structure:

* Address (form control)

* Year (form control)

* Habitant (form group)
  * habitantName (form control)
  * age (form control)
  * dependents (form array)
    * The dependents array contains form groups that has a 'source_type' form control. The 'source_type' is a selection of 3 possible values: animal, tv, or habitant. If habitant is chosen, display the Habitant form group again explained here.
      
      
## Example result:
```yaml

{
   "address":"1000 Friendly St.",
   "year":"2021",
   "habitant":{
      "habitantName":"Fist hab name",
      "age":"First hab age",
      "dependents":[
         {
            "source_type":"animal",
            "animalName":"First hab's animal name"
         },
         {
            "source_type":"habitant",
            "habitant":{
               "habitantName":"Second hab name",
               "age":"Second hab age",
               "dependents":[
                  {
                     "source_type":"habitant",
                     "habitant":{
                        "habitantName":"Third hab name",
                        "age":"Third hab age",
                        "dependents":[
                           {
                              "source_type":"tv"
                           },
                           {
                              "source_type":"habitant",
                              "habitant":{
                                 "habitantName":"Fourth hab name",
                                 "age":"Fourth hab age",
                                 "dependents":[
                                    {
                                       "source_type":null
                                    }
                                 ]
                              }
                           }
                        ]
                     }
                  }
               ]
            }
         }
      ]
   }
}

```
